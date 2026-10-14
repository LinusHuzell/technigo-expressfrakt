export type ShippingMethod = "standard" | "express";

export type ShippingResult = {
  shipping: number;
  total: number;
};

const SHIPPING_METHODS: readonly ShippingMethod[] = ["standard", "express"];

export class InvalidShippingMethodError extends Error {
  readonly method: unknown;

  constructor(method: unknown) {
    super(
      `Unknown shipping method: ${JSON.stringify(method)}. Valid methods: "standard", "express".`,
    );
    this.name = "InvalidShippingMethodError";
    this.method = method;
  }
}

export function calculateShipping(
  goodsTotal: number,
  method: ShippingMethod = "standard",
): ShippingResult {
  if (!SHIPPING_METHODS.includes(method)) {
    throw new InvalidShippingMethodError(method);
  }

  if (goodsTotal === 0) {
    return { shipping: 0, total: 0 };
  }

  if (method === "express") {
    return { shipping: 99, total: goodsTotal + 99 };
  }

  if (goodsTotal >= 500) {
    return { shipping: 0, total: goodsTotal };
  }

  return { shipping: 59, total: goodsTotal + 59 };
}
