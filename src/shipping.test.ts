import { describe, expect, it } from "vitest";
import {
  calculateShipping,
  InvalidShippingMethodError,
  type ShippingMethod,
} from "./shipping";

describe("calculateShipping", () => {
  it("charges 0 shipping when goods total is 0", () => {
    expect(calculateShipping(0)).toEqual({ shipping: 0, total: 0 });
  });

  it("charges 59 standard shipping for the smallest goods total", () => {
    expect(calculateShipping(1)).toEqual({ shipping: 59, total: 60 });
  });

  it("charges 59 standard shipping just below the free shipping threshold", () => {
    expect(calculateShipping(499)).toEqual({ shipping: 59, total: 558 });
  });

  it("charges 0 shipping when goods total is exactly 500", () => {
    expect(calculateShipping(500)).toEqual({ shipping: 0, total: 500 });
  });

  it("charges 0 shipping when goods total is above 500", () => {
    expect(calculateShipping(501)).toEqual({ shipping: 0, total: 501 });
  });

  describe("standard shipping", () => {
    it("charges 0 standard shipping when goods total is 0", () => {
      expect(calculateShipping(0, "standard")).toEqual({ shipping: 0, total: 0 });
    });

    it("charges 59 standard shipping for the smallest goods total", () => {
      expect(calculateShipping(1, "standard")).toEqual({ shipping: 59, total: 60 });
    });

    it("charges 59 standard shipping just below the free shipping threshold", () => {
      expect(calculateShipping(499, "standard")).toEqual({ shipping: 59, total: 558 });
    });

    it("charges 0 standard shipping when goods total is exactly 500", () => {
      expect(calculateShipping(500, "standard")).toEqual({ shipping: 0, total: 500 });
    });

    it("charges 0 standard shipping when goods total is above 500", () => {
      expect(calculateShipping(501, "standard")).toEqual({ shipping: 0, total: 501 });
    });
  });

  describe("express shipping", () => {
    it("charges 0 express shipping when goods total is 0", () => {
      expect(calculateShipping(0, "express")).toEqual({ shipping: 0, total: 0 });
    });

    it("charges 99 express shipping for the smallest goods total", () => {
      expect(calculateShipping(1, "express")).toEqual({ shipping: 99, total: 100 });
    });

    it("charges 99 express shipping just below the free shipping threshold", () => {
      expect(calculateShipping(499, "express")).toEqual({ shipping: 99, total: 598 });
    });

    it("charges 99 express shipping when goods total is exactly 500", () => {
      expect(calculateShipping(500, "express")).toEqual({ shipping: 99, total: 599 });
    });

    it("charges 99 express shipping when goods total is above 500", () => {
      expect(calculateShipping(501, "express")).toEqual({ shipping: 99, total: 600 });
    });
  });

  describe("unknown shipping method", () => {
    it("throws for an unknown method even when goods total is 0", () => {
      expect(() =>
        calculateShipping(0, "overnight" as ShippingMethod),
      ).toThrow(InvalidShippingMethodError);
    });

    it("throws for a method with wrong letter case", () => {
      expect(() =>
        calculateShipping(499, "Express" as ShippingMethod),
      ).toThrow(InvalidShippingMethodError);
    });
  });
});
