import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidInternationalPhone,
  isValidVIN,
  isValidKSALicensePlate,
  isDateInRange,
  validateRequiredFields,
  isNumberInRange,
} from "../src/validation.js";

describe("Email validation", () => {
  it("accepts valid email addresses", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("test.user@domain.co.uk")).toBe(true);
    expect(isValidEmail("admin+tag@garage.sa")).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user @example.com")).toBe(false);
  });

  it("handles edge cases", () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("   ")).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });
});

describe("International phone validation", () => {
  it("accepts valid E.164 phone numbers", () => {
    expect(isValidInternationalPhone("+966551234567")).toBe(true);
    expect(isValidInternationalPhone("+14155552671")).toBe(true);
    expect(isValidInternationalPhone("+442071838750")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidInternationalPhone("966551234567")).toBe(false); // Missing +
    expect(isValidInternationalPhone("+0551234567")).toBe(false); // Starts with 0
    expect(isValidInternationalPhone("+1234567890123456")).toBe(false); // Too long
    expect(isValidInternationalPhone("+1")).toBe(false); // Too short
  });

  it("handles edge cases", () => {
    expect(isValidInternationalPhone(null)).toBe(false);
    expect(isValidInternationalPhone(undefined)).toBe(false);
    expect(isValidInternationalPhone("")).toBe(false);
    expect(isValidInternationalPhone("not a phone")).toBe(false);
  });
});

describe("VIN validation", () => {
  it("accepts valid VIN formats", () => {
    expect(isValidVIN("1HGBH41JXMN109186")).toBe(true);
    expect(isValidVIN("WBADT43452G123456")).toBe(true);
    expect(isValidVIN("JH4KA7561MC000000")).toBe(true);
  });

  it("rejects invalid VINs", () => {
    expect(isValidVIN("1HGBH41JXMN10918")).toBe(false); // Too short
    expect(isValidVIN("1HGBH41JXMN1091866")).toBe(false); // Too long
    expect(isValidVIN("1HGBH41JXMN10918I")).toBe(false); // Contains I
    expect(isValidVIN("1HGBH41JXMN10918O")).toBe(false); // Contains O
    expect(isValidVIN("1HGBH41JXMN10918Q")).toBe(false); // Contains Q
    expect(isValidVIN("1HGBH41JXMN10918@")).toBe(false); // Special char
  });

  it("handles edge cases", () => {
    expect(isValidVIN(null)).toBe(false);
    expect(isValidVIN(undefined)).toBe(false);
    expect(isValidVIN("")).toBe(false);
    expect(isValidVIN("   ")).toBe(false);
  });

  it("is case insensitive", () => {
    expect(isValidVIN("1hgbh41jxmn109186")).toBe(true);
    expect(isValidVIN("1HGBH41JXMN109186")).toBe(true);
  });
});

describe("KSA license plate validation", () => {
  it("accepts valid KSA license plates", () => {
    expect(isValidKSALicensePlate("أبج 1234")).toBe(true);
    expect(isValidKSALicensePlate("أبجد 123")).toBe(true);
    expect(isValidKSALicensePlate("أبج1234")).toBe(true); // No space
  });

  it("rejects invalid license plates", () => {
    expect(isValidKSALicensePlate("AB 1234")).toBe(false); // Latin letters
    expect(isValidKSALicensePlate("أب 1234")).toBe(false); // Too few letters
    expect(isValidKSALicensePlate("أبجده 1234")).toBe(false); // Too many letters
    expect(isValidKSALicensePlate("أبج 12345")).toBe(false); // Too many digits
  });

  it("handles edge cases", () => {
    expect(isValidKSALicensePlate(null)).toBe(false);
    expect(isValidKSALicensePlate(undefined)).toBe(false);
    expect(isValidKSALicensePlate("")).toBe(false);
  });
});

describe("Date range validation", () => {
  it("accepts dates within range", () => {
    const date = new Date("2024-06-15");
    const min = new Date("2024-01-01");
    const max = new Date("2024-12-31");
    
    expect(isDateInRange(date, min, max)).toBe(true);
  });

  it("accepts boundary dates", () => {
    const min = new Date("2024-01-01");
    const max = new Date("2024-12-31");
    
    expect(isDateInRange(min, min, max)).toBe(true);
    expect(isDateInRange(max, min, max)).toBe(true);
  });

  it("rejects dates outside range", () => {
    const min = new Date("2024-01-01");
    const max = new Date("2024-12-31");
    
    expect(isDateInRange(new Date("2023-12-31"), min, max)).toBe(false);
    expect(isDateInRange(new Date("2025-01-01"), min, max)).toBe(false);
  });

  it("accepts string date formats", () => {
    expect(isDateInRange("2024-06-15", "2024-01-01", "2024-12-31")).toBe(true);
  });

  it("handles invalid dates", () => {
    expect(isDateInRange("invalid", "2024-01-01", "2024-12-31")).toBe(false);
    expect(isDateInRange(null, "2024-01-01", "2024-12-31")).toBe(false);
    expect(isDateInRange(undefined, "2024-01-01", "2024-12-31")).toBe(false);
  });
});

describe("Required fields validation", () => {
  it("validates all required fields are present", () => {
    const obj = { name: "Test", email: "test@example.com", phone: "+966551234567" };
    const result = validateRequiredFields(obj, ["name", "email", "phone"]);
    
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it("identifies missing fields", () => {
    const obj = { name: "Test" };
    const result = validateRequiredFields(obj, ["name", "email", "phone"]);
    
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual(["email", "phone"]);
  });

  it("treats empty strings as missing", () => {
    const obj = { name: "", email: "   ", phone: "+966551234567" };
    const result = validateRequiredFields(obj, ["name", "email", "phone"]);
    
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual(["name", "email"]);
  });

  it("treats null and undefined as missing", () => {
    const obj = { name: null, email: undefined, phone: "+966551234567" };
    const result = validateRequiredFields(obj, ["name", "email", "phone"]);
    
    expect(result.valid).toBe(false);
    expect(result.missing).toEqual(["name", "email"]);
  });

  it("handles edge cases", () => {
    expect(validateRequiredFields(null, ["field"]).valid).toBe(false);
    expect(validateRequiredFields(undefined, ["field"]).valid).toBe(false);
    expect(validateRequiredFields({}, []).valid).toBe(true);
  });
});

describe("Numeric range validation", () => {
  it("accepts numbers within range", () => {
    expect(isNumberInRange(5, 0, 10)).toBe(true);
    expect(isNumberInRange(0, 0, 10)).toBe(true);
    expect(isNumberInRange(10, 0, 10)).toBe(true);
  });

  it("rejects numbers outside range", () => {
    expect(isNumberInRange(-1, 0, 10)).toBe(false);
    expect(isNumberInRange(11, 0, 10)).toBe(false);
  });

  it("handles negative ranges", () => {
    expect(isNumberInRange(-5, -10, 0)).toBe(true);
    expect(isNumberInRange(-11, -10, 0)).toBe(false);
  });

  it("handles decimal numbers", () => {
    expect(isNumberInRange(5.5, 0, 10)).toBe(true);
    expect(isNumberInRange(10.1, 0, 10)).toBe(false);
  });

  it("rejects non-numeric values", () => {
    expect(isNumberInRange("5", 0, 10)).toBe(false);
    expect(isNumberInRange(null, 0, 10)).toBe(false);
    expect(isNumberInRange(undefined, 0, 10)).toBe(false);
    expect(isNumberInRange(NaN, 0, 10)).toBe(false);
  });
});
