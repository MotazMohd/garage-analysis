import { describe, it, expect } from "vitest";
import {
    formatDate,
    formatDistance,
    formatPercentage,
    formatName,
    formatKSAAddress,
} from "../src/formatting.js";

describe("Date formatting", () => {
    const testDate = new Date("2024-05-15T10:00:00Z");

    it("formats dates in English locale", () => {
        expect(formatDate(testDate, "en-US")).toBe("May 15, 2024");
    });

    it("formats dates in Arabic locale", () => {
        // Note: The specific output might vary slightly based on Node version's ICU data
        // So we check for key components rather than exact string
        const result = formatDate(testDate, "ar-SA");
        expect(result).toMatch(/[\u0600-\u06FF]/); // Contains Arabic chars
        expect(result).toContain("2024");
    });

    it("accepts custom options", () => {
        const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        expect(formatDate(testDate, "en-US", options)).toBe("Wednesday, May 15, 2024");
    });

    it("handles invalid dates", () => {
        expect(formatDate("invalid-date")).toBe("");
        expect(formatDate(null)).toBe("");
        expect(formatDate(undefined)).toBe("");
    });
});

describe("Distance formatting", () => {
    it("formats kilometers correctly", () => {
        expect(formatDistance(1234.5, "km", "en-US")).toBe("1,234.5 km");
    });

    it("formats miles correctly", () => {
        expect(formatDistance(1234.5, "mi", "en-US")).toBe("1,234.5 mi");
    });

    it("localizes formats", () => {
        const result = formatDistance(1234.5, "km", "de-DE");
        // German uses comma as decimal separator
        expect(result).toContain("1.234,5");
        expect(result).toContain("km");
    });

    it("handles invalid input", () => {
        expect(formatDistance(null)).toBe("");
        expect(formatDistance("100")).toBe(""); // string not accepted
        expect(formatDistance(undefined)).toBe("");
    });
});

describe("Percentage formatting", () => {
    it("formats standard percentages", () => {
        expect(formatPercentage(0.5, "en-US")).toBe("50%");
        expect(formatPercentage(0.125, "en-US")).toBe("12.5%");
    });

    it("formats percentages > 100%", () => {
        expect(formatPercentage(1.5, "en-US")).toBe("150%");
    });

    it("handles invalid input", () => {
        expect(formatPercentage(null)).toBe("");
        expect(formatPercentage("0.5")).toBe(""); // string not accepted
    });
});

describe("Name formatting", () => {
    it("joins name parts correctly", () => {
        const name = { first: "John", last: "Doe" };
        expect(formatName(name)).toBe("John Doe");
    });

    it("handles all parts", () => {
        const name = { first: "Ahmed", middle: "Mohamed", last: "Ali", family: "Khan" };
        expect(formatName(name)).toBe("Ahmed Mohamed Ali Khan");
    });

    it("skips missing parts", () => {
        const name = { first: "Cher", middle: "", last: null };
        expect(formatName(name)).toBe("Cher");
    });

    it("handles invalid input", () => {
        expect(formatName(null)).toBe("");
        expect(formatName({})).toBe("");
    });
});

describe("KSA address formatting", () => {
    it("formats complete address", () => {
        const address = {
            buildingNumber: "1234",
            streetName: "King Fahd Road",
            district: "Al Olaya",
            city: "Riyadh",
            postalCode: "12211",
            additionalNumber: "5678"
        };

        const formatted = formatKSAAddress(address);
        expect(formatted).toBe("1234 King Fahd Road Al Olaya\nRiyadh 12211-5678");
    });

    it("formats partial address", () => {
        const address = {
            streetName: "Main St",
            city: "Jeddah"
        };

        const formatted = formatKSAAddress(address);
        expect(formatted).toBe("Main St\nJeddah");
    });

    it("handles invalid input", () => {
        expect(formatKSAAddress(null)).toBe("");
        expect(formatKSAAddress({})).toBe("");
    });
});
