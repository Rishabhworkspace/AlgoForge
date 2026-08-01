import { prisma } from '../config/db';
import { allTerminalCatalog } from './data/terminalCatalog';

const syncTerminalCatalog = async () => {
    let updated = 0;
    for (const problem of allTerminalCatalog) {
        const result = await prisma.problem.updateMany({
            where: { title: problem.title },
            data: {
                description: problem.description,
                testCases: problem.testCases
            }
        });
        updated += result.count;
    }
    console.log(`Updated ${updated} stored problem records from ${allTerminalCatalog.length} catalog entries.`);
};

syncTerminalCatalog()
    .catch(error => {
        console.error('Terminal catalog sync failed:', error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
