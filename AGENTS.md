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

## Project

- TypeScript. Entry: `src/index.ts`. Logic: `src/shipping.ts`.
- Run with `npm start`. Test with `npm test`.
