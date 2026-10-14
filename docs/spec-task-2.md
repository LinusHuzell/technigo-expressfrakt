# Spec: Expressfrakt (uppgift 2)

## Bakgrund

`calculateShipping(goodsTotal)` i `src/shipping.ts` räknar i dag ut standardfrakt:

| Varusumma        | Frakt | Totalt            |
| ---------------- | ----- | ----------------- |
| 0 kr             | 0 kr  | 0 kr              |
| 1–499 kr         | 59 kr | varusumma + 59 kr |
| 500 kr eller mer | 0 kr  | varusumma         |

Funktionen returnerar `{ shipping, total }`. Nu ska den också kunna ta emot ett fraktval: standard eller express.

## Krav

- **K1** Funktionen tar emot ett fraktval av typen `ShippingMethod = "standard" | "express"` som andra parameter: `calculateShipping(goodsTotal, method = "standard")`.
- **K2** Utelämnas fraktvalet används standard, så att anrop med bara varusumma fungerar som förut.
- **K3** Reglerna för standardfrakt bevaras: 0 kr vid 0 kr, 59 kr vid 1–499 kr och 0 kr från 500 kr.
- **K4** Express kostar 99 kr för alla positiva varusummor, även när varusumman är 500 kr eller mer.
- **K5** Är varusumman 0 blir frakt och totalsumma 0 för båda fraktvalen.
- **K6** Ett okänt fraktval kastar `InvalidShippingMethodError` och ger inget resultat. Det gäller även när varusumman är 0. Fraktvalet kontrolleras därför före all beräkning.
- **K7** Resultatet har fortfarande fälten `{ shipping, total }`, och `total = goodsTotal + shipping`.

### Giltiga värden

- Exakt `"standard"` och `"express"`.
- Att fraktvalet utelämnas räknas som standard.
- Allt annat ger fel, till exempel `"Express"`, `" express"`, `""` och `null`. Stavning och skiftläge rättas inte automatiskt.

## Felrepresentation

Ett okänt fraktval kastar ett eget fel:

- `InvalidShippingMethodError extends Error` exporteras från `src/shipping.ts`.
- Felet har egenskapen `method` med det ogiltiga värdet.
- Meddelandet ser ut så här: `Unknown shipping method: "overnight". Valid methods: "standard", "express".`

**Varför ett kastat fel:** returtypen förblir `{ shipping, total }`, så befintliga anrop påverkas inte. Felet kan dessutom kännas igen med `instanceof`, vilket är säkrare än att jämföra meddelanden.

## Ändras och bevaras

| Ändras                                     | Bevaras                                     |
| ------------------------------------------ | ------------------------------------------- |
| Signaturen får en valfri andra parameter   | Reglerna för standardfrakt                  |
| Expressfrakt tillkommer                    | Resultatets fält `{ shipping, total }`      |
| `InvalidShippingMethodError` tillkommer    | Anrop med bara varusumma, t.ex. `calculateShipping(499)` |

## Icke-mål

- Rabatter
- Moms
- Valutor
- Fler fraktsätt
- Automatisk rättning av stavning och skiftläge
- Validering av negativa varusummor och varusummor som inte är heltal. Beteendet för dem är odefinierat och testas inte.

## Acceptanskriterier

- Varje rad i kontrolltabellen ger förväntat resultat.
- `npm test` är grönt. Befintliga tester för standardfrakt är oförändrade och gröna.
- README dokumenterar fraktvalen och felrepresentationen.

## Kontrolltabell

De förväntade värdena är ifyllda för hand utifrån kraven, innan implementationen. Fyra rader (5, 11, 12 och 13) rättades efter granskning mot kraven. Kolumnen "Faktiskt" fylldes i efter körning av den färdiga implementationen.

| #  | Krav-ID | Varusumma | Fraktval      | Förväntat            | Faktiskt |
| -- | ------- | --------- | ------------- | -------------------- | -------- |
| 1  | K5      | 0         | `"standard"`  | Frakt 0, totalt 0    | Frakt 0, totalt 0 ✅ |
| 2  | K3      | 1         | `"standard"`  | Frakt 59, totalt 60  | Frakt 59, totalt 60 ✅ |
| 3  | K3      | 499       | `"standard"`  | Frakt 59, totalt 558 | Frakt 59, totalt 558 ✅ |
| 4  | K3      | 500       | `"standard"`  | Frakt 0, totalt 500  | Frakt 0, totalt 500 ✅ |
| 5  | K3      | 501       | `"standard"`  | Frakt 0, totalt 501  | Frakt 0, totalt 501 ✅ |
| 6  | K5      | 0         | `"express"`   | Frakt 0, totalt 0    | Frakt 0, totalt 0 ✅ |
| 7  | K4      | 1         | `"express"`   | Frakt 99, totalt 100 | Frakt 99, totalt 100 ✅ |
| 8  | K4      | 499       | `"express"`   | Frakt 99, totalt 598 | Frakt 99, totalt 598 ✅ |
| 9  | K4      | 500       | `"express"`   | Frakt 99, totalt 599 | Frakt 99, totalt 599 ✅ |
| 10 | K4      | 501       | `"express"`   | Frakt 99, totalt 600 | Frakt 99, totalt 600 ✅ |
| 11 | K2, K5  | 0         | (utelämnat)   | Frakt 0, totalt 0    | Frakt 0, totalt 0 ✅ |
| 12 | K2      | 499       | (utelämnat)   | Frakt 59, totalt 558 | Frakt 59, totalt 558 ✅ |
| 13 | K2      | 500       | (utelämnat)   | Frakt 0, totalt 500  | Frakt 0, totalt 500 ✅ |
| 14 | K6      | 0         | `"overnight"` | Fel                  | InvalidShippingMethodError ✅ |
| 15 | K6      | 499       | `"Express"`   | Fel                  | InvalidShippingMethodError ✅ |

## Motivering

1. **Värden runt 500 kr.** För standardfrakt ligger brytpunkten vid 500 kr, därför vill vi testa alla fall kring den: 499, 500 och 501 (före, på, efter). Det fångar vanliga misstag som `>` i stället för `>=`. För express testar vi att logiken för standard inte spiller över, eftersom expresspriset är detsamma för alla positiva varusummor.
2. **Noll och okänt fraktval.** Vid 0 kr blir resultatet 0 oavsett fraktval, så det är lätt att hoppa över kontrollen av fraktvalet där. Kombinationen 0 kr och okänt fraktval säkerställer att ett okänt fraktval alltid ger fel, även när varusumman är 0. Ett test med en positiv summa räcker inte, eftersom det inte avslöjar om kontrollen av fraktvalet görs först efter specialfallet för 0 kr.

## Implementationsordning

1. **Tester först (rött).** Skriv ett test per rad i kontrolltabellen i `src/shipping.test.ts`, enligt testreglerna i `AGENTS.md`. Gruppera testerna efter funktionalitet: standard, express och okänt fraktval. De befintliga testerna lämnas orörda. De anropar funktionen utan fraktval och täcker därmed rad 11–13. Kör `npm test` och kontrollera att testerna för express och okänt fraktval failar.
2. **Implementation (grönt).** Lägg till `ShippingMethod` och `InvalidShippingMethodError` i `src/shipping.ts`. Ordningen i funktionen: kontrollera fraktvalet, sedan 0 kr, sedan express och sist standard.
3. **Dokumentation.** Uppdatera README med fraktvalen och felhanteringen. Fyll i kolumnen "Faktiskt" i kontrolltabellen.
