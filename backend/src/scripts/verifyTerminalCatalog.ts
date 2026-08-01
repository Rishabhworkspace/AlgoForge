import { spawnSync } from 'node:child_process';
import { allTerminalCatalog } from './data/terminalCatalog';
import { dsaProblems } from './data/dsa';
import { algoProblems } from './data/algo';
import { dpProblems } from './data/dp';
import { graphProblems } from './data/graphs';
import { interviewProblems } from './data/interview';
import { systemDesignProblems } from './data/system-design';

// These prompts require an interactive API or a design review, neither of which
// has a meaningful stdin/stdout contract. They deliberately remain read-only.
const READ_ONLY_TITLES = new Set([
    ...systemDesignProblems.map(problem => problem.title),
    'Insert Delete GetRandom O(1)',
    'First Bad Version',
    'Binary Tree Casting'
]);

const errors: string[] = [];
const titleCounts = new Map<string, number>();

for (const problem of allTerminalCatalog) {
    titleCounts.set(problem.title, (titleCounts.get(problem.title) || 0) + 1);
}
for (const [title, count] of titleCounts) {
    if (count > 1) {
        errors.push(`${title}: duplicate terminal catalog entry`);
    }
}

for (const problem of allTerminalCatalog) {
    if (!/\binput\b/i.test(problem.description) || !/\boutput\b/i.test(problem.description)) {
        errors.push(`${problem.title}: prompt must define input and output`);
    }
    if (problem.testCases.length < 3 || problem.testCases.length > 5) {
        errors.push(`${problem.title}: expected 3 to 5 test cases`);
    }
    if (new Set(problem.testCases.map(testCase => `${testCase.input}\u0000${testCase.expectedOutput}`)).size !== problem.testCases.length) {
        errors.push(`${problem.title}: duplicate test case`);
    }
    for (const [index, testCase] of problem.testCases.entries()) {
        const result = spawnSync(process.execPath, ['-e', problem.referenceJavaScript], {
            input: testCase.input,
            encoding: 'utf8',
            timeout: 3000
        });
        if (result.error || result.status !== 0 || result.stdout.trim() !== testCase.expectedOutput.trim()) {
            errors.push(`${problem.title}: reference solution fails case ${index + 1}`);
        }
    }
}

if (process.argv.includes('--coverage')) {
    const seededTitles = new Set([
        ...dsaProblems,
        ...algoProblems,
        ...dpProblems,
        ...graphProblems,
        ...interviewProblems,
        ...systemDesignProblems
    ]
        .map(problem => problem.title)
        .filter(title => !READ_ONLY_TITLES.has(title)));
    const catalogTitles = new Set(allTerminalCatalog.map(problem => problem.title));
    for (const title of seededTitles) {
        if (!catalogTitles.has(title)) {
            errors.push(`${title}: missing terminal catalog entry`);
        }
    }
}

if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`Verified ${allTerminalCatalog.length} terminal problems and ${allTerminalCatalog.reduce((count, problem) => count + problem.testCases.length, 0)} test cases.`);
