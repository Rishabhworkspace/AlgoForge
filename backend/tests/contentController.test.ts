import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../src/config/db', () => ({
    prisma: {
        problem: {
            findUnique: vi.fn()
        }
    }
}));

import { prisma } from '../src/config/db';
import { executeCode, getProblemById } from '../src/controllers/contentController';

const mockRes = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => vi.clearAllMocks());

describe('problem terminal safety', () => {
    it('does not expose hidden cases when loading a problem', async () => {
        (prisma.problem.findUnique as any).mockResolvedValue({
            id: 'problem-1',
            testCases: [
                { input: '1', expectedOutput: '1', isHidden: false },
                { input: '2', expectedOutput: '2', isHidden: true }
            ]
        });
        const res = mockRes();

        await getProblemById({ params: { id: 'problem-1' } } as any, res);

        expect(res.json).toHaveBeenCalledWith({
            id: 'problem-1',
            testCases: [{ input: '1', expectedOutput: '1', isHidden: false }]
        });
    });

    it('rejects execution when the problem has no real test suite', async () => {
        (prisma.problem.findUnique as any).mockResolvedValue({ id: 'problem-1', testCases: [] });
        const res = mockRes();

        await executeCode({
            params: { id: 'problem-1' },
            body: { code: 'console.log(1)', language: 'javascript' }
        } as any, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('at least three') }));
    });

    it('rejects unsupported runtimes before executing code', async () => {
        (prisma.problem.findUnique as any).mockResolvedValue({ id: 'problem-1', testCases: [] });
        const res = mockRes();

        await executeCode({
            params: { id: 'problem-1' },
            body: { code: 'console.log(1)', language: 'ruby' }
        } as any, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unsupported language' });
    });

    it('returns a failed case instead of crashing when the execution service is unavailable', async () => {
        (prisma.problem.findUnique as any).mockResolvedValue({
            id: 'problem-1',
            testCases: [
                { input: '1', expectedOutput: '1', isHidden: false },
                { input: '2', expectedOutput: '2', isHidden: false },
                { input: '3', expectedOutput: '3', isHidden: false }
            ]
        });
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network unavailable')));
        const res = mockRes();

        await executeCode({
            params: { id: 'problem-1' },
            body: { code: 'console.log(1)', language: 'javascript' }
        } as any, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            allPassed: false,
            results: expect.arrayContaining([expect.objectContaining({ error: 'network unavailable', passed: false })])
        }));
    });

    it('passes every case when the executor returns the expected output', async () => {
        (prisma.problem.findUnique as any).mockResolvedValue({
            id: 'problem-1',
            testCases: [
                { input: '1', expectedOutput: 'ok', isHidden: false },
                { input: '2', expectedOutput: 'ok', isHidden: false },
                { input: '3', expectedOutput: 'ok', isHidden: true }
            ]
        });
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ run: { stdout: 'ok\n', code: 0 } })
        }));
        const res = mockRes();

        await executeCode({
            params: { id: 'problem-1' },
            body: { code: 'console.log("ok")', language: 'javascript' }
        } as any, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true, allPassed: true }));
    });
});
