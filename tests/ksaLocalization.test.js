const { describe, it, expect } = require("vitest");
const {
  normalizeSaudiPhoneNumber,
  formatSarCurrency,
} = require("../src/ksaLocalization");

describe("KSA localization utilities", () => {
  it("normalizes valid Saudi mobile numbers to E.164", () => {
    expect(normalizeSaudiPhoneNumber("0551234567")).toBe("+966551234567");
    expect(normalizeSaudiPhoneNumber("+966 55 123 4567")).toBe("+966551234567");
    expect(normalizeSaudiPhoneNumber("966551234567")).toBe("+966551234567");
  });

  it("rejects invalid Saudi mobile numbers", () => {
    expect(normalizeSaudiPhoneNumber("+966 12 345 6789")).toBeNull();
    expect(normalizeSaudiPhoneNumber("051234567")).toBeNull();
    expect(normalizeSaudiPhoneNumber(null)).toBeNull();
  });

  it("formats SAR currency using Arabic locale", () => {
    const formatted = formatSarCurrency(1500);
    expect(formatted).toContain("ر.س");
    expect(formatted).toMatch(/[٠-٩]/);
  });
});
