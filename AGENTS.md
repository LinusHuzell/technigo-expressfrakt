# Agent instructions

Exercise specs and human conversation may be in Swedish. All naming in this repository must be English.

## Naming

- Use English for files, folders, functions, types, variables, test titles, and user-facing log strings.
- Do not copy Swedish names from the spec into code. Translate the concept, then name it in English.
- Domain mapping for this exercise:
  - `beräkna` → `calculateShipping`
  - `varusumma` → `goodsTotal`
  - `frakt` → `shipping`
  - `totalt` → `total`

```ts
// ❌ BAD
export function berakna(varusumma: number): { frakt: number; totalt: number }

// ✅ GOOD
export function calculateShipping(goodsTotal: number): { shipping: number; total: number }
```

## Tests

- Keep each test small: one `it` checks one behavior, usually with a single `expect`.
- The test title says exactly which behavior is checked, so a failing test tells you what broke without opening it.
- Every requirement in the spec must be covered by at least one test whose title makes the requirement easy to find.
- Group and order tests by functionality (e.g. zero total, standard shipping, free shipping), not by the order or numbering of the requirements.
- Tests that don't map to a requirement are allowed (e.g. extra edge cases or regressions). Add them next to the related functionality.
- Do not use table-driven tests (`it.each`). Write each case as its own `it`.

```ts
// ❌ BAD: one test covers several requirements, and the title is generic
it.each([[0, 0], [1, 59], [500, 0]])("works for %i", ...)

// ✅ GOOD: one behavior per test, and the title describes it
it("charges 0 shipping when goods total is exactly 500", () => {
  expect(calculateShipping(500)).toEqual({ shipping: 0, total: 500 });
});
```

## Project

- TypeScript. Entry: `src/index.ts`. Logic: `src/shipping.ts`.
- Run with `npm start`. Test with `npm test`.
