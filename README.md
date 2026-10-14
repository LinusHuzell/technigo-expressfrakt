# Expressfrakt

Ett litet TypeScript-projekt som räknar ut frakt och totalsumma för en beställning.

## Regler

| Varusumma        | Frakt  | Totalt              |
| ---------------- | ------ | ------------------- |
| 0 kr             | 0 kr   | 0 kr                |
| 1–499 kr         | 59 kr  | varusumma + 59 kr   |
| 500 kr eller mer | 0 kr   | varusumma           |

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
```

Vill du testa andra belopp, ändra listan `examples` i `src/index.ts`.

## Köra testerna

```sh
npm test            # kör alla tester en gång
npm run test:watch  # kör om testerna när filer ändras
```

Testerna använder [Vitest](https://vitest.dev/) och finns i `src/shipping.test.ts`.

## Projektstruktur

```
src/
├── index.ts          # Startpunkt – skriver ut exempel
├── shipping.ts       # Logiken: calculateShipping(goodsTotal)
└── shipping.test.ts  # Tester för calculateShipping
```
