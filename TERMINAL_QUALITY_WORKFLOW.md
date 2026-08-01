# Solving terminal quality loop

Use this workflow whenever problem content or code execution changes. Keep the
loop running until every terminal-enabled problem meets the exit criteria.

## Source of truth

- `backend/src/scripts/data/*.ts` lists every seeded problem.
- The problem catalog must hold the full prompt, constraints, examples, and
  three to five stdin/stdout cases for each runnable problem.
- Conceptual system-design prompts and API-contract problems (`Insert Delete
  GetRandom O(1)`, `First Bad Version`, and `Binary Tree Casting`) are not
  code-runner problems; render them as reading prompts until an explicit
  evaluator or contract is implemented.

## Loop

1. Spawn one audit sub-agent. It must inspect the catalog and report missing
   prompts, invalid case counts, duplicate IDs, and test cases whose reference
   solution does not pass.
2. Read the report and repair only the reported catalog entries or shared
   execution path. Never add a fallback or generic test case.
3. Run `npm run verify:terminal-coverage` in `backend`. It must fail for a
   missing runnable prompt, fewer than three or more than five cases,
   malformed input/output, or a failing reference solution. Read-only prompts
   are intentionally excluded from this check.
4. Run `npm run sync:terminal-catalog` in `backend` to update existing problem
   records without deleting users or progress, then run `npm run build` in
   `app` and `npm test` in `backend`.
5. Start the app and backend, then use the browser to open a representative
   problem from each input shape (scalar, array, matrix, linked list/tree).
   Confirm the prompt, visible cases, execution result, and submission state.
6. If any check fails, return to step 1. Stop only when all checks pass.

## Exit criteria

- Every runnable seeded problem has an exact prompt and three to five verified
  cases.
- System-design and API-contract prompts are read-only and cannot be submitted.
- Each case is specific to its problem; generic cases are forbidden.
- A known-good solution passes and a known-bad solution fails for every entry.
- The terminal displays the prompt and result without exposing hidden cases.
- App build and backend tests pass.

## Guardrails

- Treat external problem pages as research only; do not copy their protected
  prose verbatim. Write original descriptions from the specification.
- Keep test input in the same stdin contract shown by the problem prompt.
- Do not mark a problem solved from an empty test set or a failed execution.
