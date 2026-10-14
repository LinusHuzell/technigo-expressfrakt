import { describe, expect, it } from "vitest";
import { calculateShipping } from "./shipping";

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
});
