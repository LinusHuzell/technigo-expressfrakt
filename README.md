# Expressfrakt

Ett litet TypeScript-projekt som räknar ut frakt och totalsumma för en beställning.

## Regler

```ts
calculateShipping(goodsTotal, method = "standard") // → { shipping, total }
```

Fraktvalet `method` är `"standard"` eller `"express"`. Om det utelämnas används standard.

| Varusumma        | Standard | Express |
| ---------------- | -------- | ------- |
| 0 kr             | 0 kr     | 0 kr    |
| 1–499 kr         | 59 kr    | 99 kr   |
| 500 kr eller mer | 0 kr     | 99 kr   |

Totalsumman är alltid varusumma + frakt.

### Felhantering

Bara de exakta strängarna `"standard"` och `"express"` är giltiga. Stavning och skiftläge rättas inte, så till exempel `"Express"` räknas som ogiltigt. Ett ogiltigt fraktval kastar `InvalidShippingMethodError` och ger inget resultat, även när varusumman är 0:

```ts
import {
  calculateShipping,
  InvalidShippingMethodError,
  type ShippingMethod,
} from "./shipping";

try {
  calculateShipping(499, "overnight" as ShippingMethod);
} catch (error) {
  if (error instanceof InvalidShippingMethodError) {
    console.error(error.message); // Unknown shipping method: "overnight". Valid methods: "standard", "express".
  }
}
```

Felet har egenskapen `method` med det ogiltiga värdet. Hela specifikationen finns i [`docs/spec-task-2.md`](docs/spec-task-2.md).

## Krav

- [Node.js](https://nodejs.org/) (LTS-version rekommenderas)
- npm (följer med Node.js)

## Kom igång

Installera beroenden:

```sh
npm install
```

## Köra koden

```sh
npm start
```

Kör `src/index.ts` med [tsx](https://tsx.is/) och skriver ut några exempel:

```
Goods total 0 kr → shipping 0 kr, total 0 kr
Goods total 1 kr → shipping 59 kr, total 60 kr
Goods total 499 kr → shipping 59 kr, total 558 kr
Goods total 500 kr → shipping 0 kr, total 500 kr
Goods total 501 kr → shipping 0 kr, total 501 kr
```

Vill du testa andra belopp, ändra listan `examples` i `src/index.ts`.

## Köra testerna

```sh
npm test            # kör alla tester en gång
npm run test:watch  # kör om testerna när filer ändras
```

Testerna använder [Vitest](https://vitest.dev/) och finns i `src/shipping.test.ts`. De kontrollerar fallen 0, 1, 499, 500 och 501 kr för båda fraktvalen och utan fraktval, samt att okända fraktval ger fel.

## Projektstruktur

```
docs/
└── spec-task-2.md    # Specifikation för expressfrakt
src/
├── index.ts          # Startpunkt – skriver ut exempel
├── shipping.ts       # Logiken: calculateShipping(goodsTotal, method)
└── shipping.test.ts  # Tester för calculateShipping
```
