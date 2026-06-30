import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import http from 'http';

// Mock database connection config to avoid real MongoDB connections during test runs
vi.mock('../src/config/db', () => ({
    __esModule: true,
    prisma: {
        user: {
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        }
    },
    default: vi.fn(),
}));

import { app } from '../src/server';

describe('Security Headers Integration Test', () => {
    let server: http.Server;
    let url: string;

    beforeAll(() => {
        return new Promise<void>((resolve) => {
            // Spin up the app on an ephemeral dynamic port
            server = app.listen(0, () => {
                const address = server.address();
                const port = typeof address === 'string' ? 0 : address?.port;
                url = `http://localhost:${port}`;
                resolve();
            });
        });
    });

    afterAll(() => {
        return new Promise<void>((resolve) => {
            server.close(() => resolve());
        });
    });

    it('should set appropriate security headers on /api/health', async () => {
        const response = await fetch(`${url}/api/health`);
        expect(response.status).toBe(200);

        const headers = response.headers;

        // Express default fingerprint header X-Powered-By must be removed
        expect(headers.get('x-powered-by')).toBeNull();

        // Content-Security-Policy (CSP) custom directives
        const csp = headers.get('content-security-policy');
        expect(csp).not.toBeNull();
        expect(csp).toContain("default-src 'none'");
        expect(csp).toContain("frame-ancestors 'none'");

        // Cross-Origin-Opener-Policy (COOP)
        expect(headers.get('cross-origin-opener-policy')).toBe('same-origin-allow-popups');

        // Cross-Origin-Resource-Policy (CORP)
        expect(headers.get('cross-origin-resource-policy')).toBe('cross-origin');

        // Referrer-Policy
        expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');

        // X-Content-Type-Options
        expect(headers.get('x-content-type-options')).toBe('nosniff');

        // X-Frame-Options
        expect(headers.get('x-frame-options')).toBe('DENY');

        // Permissions-Policy
        const permissions = headers.get('permissions-policy');
        expect(permissions).not.toBeNull();
        expect(permissions).toContain('accelerometer=()');
        expect(permissions).toContain('camera=()');
        expect(permissions).toContain('microphone=()');
    });
});
