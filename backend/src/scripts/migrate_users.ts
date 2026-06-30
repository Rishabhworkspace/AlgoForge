import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { config } from '../config/env';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const uri = config.MONGO_URI as string;

async function migrate() {
    console.log("Starting migration using Prisma engine to bypass DNS issues...");

    // 1. Connect to the 'test' database using Prisma
    const testDbUri = uri.replace('/algoforge', '/test');
    const testPrisma = new PrismaClient({
        datasources: { db: { url: testDbUri } }
    });

    // 2. Connect to the 'algoforge' database
    const algoforgePrisma = new PrismaClient({
        datasources: { db: { url: uri } }
    });

    try {
        console.log("Fetching old users from 'test' database...");
        
        // Find users from test db using raw command
        const usersResult = await testPrisma.$runCommandRaw({
            find: "users",
            filter: {}
        }) as any;

        const oldUsers = usersResult?.cursor?.firstBatch || [];
        console.log(`Found ${oldUsers.length} old users.`);

        if (oldUsers.length > 0) {
            console.log("Inserting into 'algoforge.User'...");
            for (const user of oldUsers) {
                // Ensure the user doesn't already exist in the new DB
                const exists = await algoforgePrisma.user.findUnique({
                    where: { id: user._id.$oid || user._id }
                }).catch(() => null);

                if (!exists) {
                    try {
                        await algoforgePrisma.user.create({
                            data: {
                                id: user._id.$oid || user._id,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                                googleId: user.googleId,
                                role: user.role || 'user',
                                isBanned: user.isBanned || false,
                                avatar: user.avatar,
                                xp_points: user.xp_points || 0,
                                streak_days: user.streak_days || 0,
                                last_active: user.last_active ? new Date(user.last_active.$date || user.last_active) : new Date(),
                                createdAt: user.createdAt ? new Date(user.createdAt.$date || user.createdAt) : new Date(),
                                updatedAt: user.updatedAt ? new Date(user.updatedAt.$date || user.updatedAt) : new Date(),
                                bookmarks: user.bookmarks || []
                            }
                        });
                    } catch (e) {
                        console.error("Skipped a user due to validation error:", user.email);
                    }
                }
            }
            console.log("Users migrated successfully!");
        }

        console.log("Fetching old UserProgress from 'test' database...");
        
        // Find user progress from test db
        const progressResult = await testPrisma.$runCommandRaw({
            find: "userprogresses",
            filter: {}
        }) as any;
        const oldProgress1 = progressResult?.cursor?.firstBatch || [];

        const progressResultFallback = await testPrisma.$runCommandRaw({
            find: "userprogress",
            filter: {}
        }) as any;
        const oldProgress2 = progressResultFallback?.cursor?.firstBatch || [];

        const allOldProgress = [...oldProgress1, ...oldProgress2];
        console.log(`Found ${allOldProgress.length} progress records.`);

        if (allOldProgress.length > 0) {
            console.log("Inserting into 'algoforge.UserProgress'...");
            for (const progress of allOldProgress) {
                const exists = await algoforgePrisma.userProgress.findUnique({
                    where: { id: progress._id.$oid || progress._id }
                }).catch(() => null);

                if (!exists) {
                    try {
                        await algoforgePrisma.userProgress.create({
                            data: {
                                id: progress._id.$oid || progress._id,
                                user_id: progress.user_id.$oid || progress.user_id,
                                problem_id: progress.problem_id.$oid || progress.problem_id,
                                status: progress.status || 'TODO',
                                is_bookmarked: progress.is_bookmarked || false,
                                notes: progress.notes || '',
                                createdAt: progress.createdAt ? new Date(progress.createdAt.$date || progress.createdAt) : new Date(),
                                updatedAt: progress.updatedAt ? new Date(progress.updatedAt.$date || progress.updatedAt) : new Date(),
                            }
                        });
                    } catch(e) {
                        console.log("Skipped a progress record due to missing user/problem relation.");
                    }
                }
            }
            console.log("UserProgress migrated successfully!");
        }

        console.log("\nMigration completed! You can now run your Prisma app.");

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await testPrisma.$disconnect();
        await algoforgePrisma.$disconnect();
    }
}

migrate();
