export type ShippingResult = {
  shipping: number;
  total: number;
};

export function calculateShipping(goodsTotal: number): ShippingResult {
  if (goodsTotal === 0) {
    return { shipping: 0, total: 0 };
  }

  if (goodsTotal >= 500) {
    return { shipping: 0, total: goodsTotal };
  }

  return { shipping: 59, total: goodsTotal + 59 };
}
