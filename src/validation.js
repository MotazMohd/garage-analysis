/**
 * Validation utilities for the garage management system
 * All functions return true for valid input, false for invalid
 */

/**
 * Validates email addresses using RFC 5322 simplified pattern
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates international phone numbers in E.164 format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid E.164 format
 */
export function isValidInternationalPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  // E.164 format: +[country code][number] (max 15 digits)
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone.trim());
}

/**
 * Validates Vehicle Identification Number (VIN)
 * Standard VIN is 17 characters, excludes I, O, Q
 * @param {string} vin - VIN to validate
 * @returns {boolean} True if valid VIN format
 */
export function isValidVIN(vin) {
  if (!vin || typeof vin !== 'string') {
    return false;
  }
  
  const cleaned = vin.trim().toUpperCase();
  
  // Must be exactly 17 characters
  if (cleaned.length !== 17) {
    return false;
  }
  
  // Cannot contain I, O, or Q
  if (/[IOQ]/.test(cleaned)) {
    return false;
  }
  
  // Must be alphanumeric
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleaned)) {
    return false;
  }
  
  return true;
}

/**
 * Validates Saudi Arabia license plate format
 * Format: 3-4 Arabic letters + 1-4 digits
 * @param {string} plate - License plate to validate
 * @returns {boolean} True if valid KSA plate format
 */
export function isValidKSALicensePlate(plate) {
  if (!plate || typeof plate !== 'string') {
    return false;
  }
  
  const cleaned = plate.trim();
  
  // KSA plates: Arabic letters (3-4) followed by digits (1-4)
  // Arabic letter range: \u0600-\u06FF
  const ksaPlateRegex = /^[\u0600-\u06FF]{3,4}\s?\d{1,4}$/;
  
  return ksaPlateRegex.test(cleaned);
}

/**
 * Validates that a date is within a specified range
 * @param {Date|string} date - Date to validate
 * @param {Date|string} minDate - Minimum allowed date (inclusive)
 * @param {Date|string} maxDate - Maximum allowed date (inclusive)
 * @returns {boolean} True if date is within range
 */
export function isDateInRange(date, minDate, maxDate) {
  try {
    const d = new Date(date);
    const min = new Date(minDate);
    const max = new Date(maxDate);
    
    // Check for invalid dates
    if (isNaN(d.getTime()) || isNaN(min.getTime()) || isNaN(max.getTime())) {
      return false;
    }
    
    return d >= min && d <= max;
  } catch {
    return false;
  }
}

/**
 * Validates that required fields are present and non-empty
 * @param {Object} obj - Object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Object} { valid: boolean, missing: string[] }
 */
export function validateRequiredFields(obj, requiredFields) {
  if (!obj || typeof obj !== 'object') {
    return { valid: false, missing: requiredFields };
  }
  
  const missing = requiredFields.filter(field => {
    const value = obj[field];
    
    // Check for null, undefined, or empty string
    if (value === null || value === undefined) {
      return true;
    }
    
    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }
    
    return false;
  });
  
  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Validates a numeric value is within a range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {boolean} True if value is within range
 */
export function isNumberInRange(value, min, max) {
  if (typeof value !== 'number' || isNaN(value)) {
    return false;
  }
  
  return value >= min && value <= max;
}
