export type ShippingMethod = "standard" | "express";

export type ShippingResult = {
  shipping: number;
  total: number;
};

const SHIPPING_METHODS: readonly ShippingMethod[] = ["standard", "express"];

const STANDARD_SHIPPING_FEE = 59;
const EXPRESS_SHIPPING_FEE = 99;
const FREE_STANDARD_SHIPPING_FROM = 500;

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

/**
 * Calculates shipping and order total for a goods total.
 *
 * - An empty order (goods total 0) costs nothing, whatever the method.
 * - Standard costs 59 kr, and is free from 500 kr.
 * - Express always costs 99 kr. It never gets free shipping.
 *
 * Throws InvalidShippingMethodError for any method other than
 * "standard" or "express", even for an empty order.
 */
export function calculateShipping(
  goodsTotal: number,
  method: ShippingMethod = "standard",
): ShippingResult {
  // Validate first, so an unknown method fails even when the order is empty.
  if (!SHIPPING_METHODS.includes(method)) {
    throw new InvalidShippingMethodError(method);
  }

  const shipping = shippingFee(goodsTotal, method);
  return { shipping, total: goodsTotal + shipping };
}

function shippingFee(goodsTotal: number, method: ShippingMethod): number {
  const isEmptyOrder = goodsTotal === 0;
  if (isEmptyOrder) {
    return 0;
  }

  if (method === "express") {
    return EXPRESS_SHIPPING_FEE;
  }

  const qualifiesForFreeShipping = goodsTotal >= FREE_STANDARD_SHIPPING_FROM;
  return qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
}
