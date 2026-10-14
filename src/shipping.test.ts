import { describe, expect, it } from "vitest";
import { calculateShipping } from "./shipping";

describe("calculateShipping", () => {
  it("charges 0 shipping when goods total is 0", () => {
    expect(calculateShipping(0)).toEqual({ shipping: 0, total: 0 });
  });

  it("charges 59 standard shipping for goods totals from 1 to 499", () => {
    expect(calculateShipping(1)).toEqual({ shipping: 59, total: 60 });
    expect(calculateShipping(499)).toEqual({ shipping: 59, total: 558 });
  });

  it("charges 0 shipping when goods total is at least 500", () => {
    expect(calculateShipping(500)).toEqual({ shipping: 0, total: 500 });
  });
});
