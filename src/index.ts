import { calculateShipping } from "./shipping";

const examples = [0, 1, 499, 500, 501];

for (const goodsTotal of examples) {
  const { shipping, total } = calculateShipping(goodsTotal);
  console.log(
    `Goods total ${goodsTotal} kr → shipping ${shipping} kr, total ${total} kr`,
  );
}
