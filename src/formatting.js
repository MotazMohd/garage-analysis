/**
 * Formatting utilities for the garage management system
 * Handles localization, unit conversion, and display formatting
 */

/**
 * Formats a date according to the specified locale and options
 * @param {Date|string|number} date - Date to format
 * @param {string} [locale='en-US'] - Locale string (e.g., 'en-US', 'ar-SA')
 * @param {Object} [options={}] - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, locale = 'en-US', options = {}) {
    try {
        const d = new Date(date);
        if (date === null || isNaN(d.getTime())) {
            return '';
        }

        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            numberingSystem: 'latn'
        };

        return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(d);
    } catch {
        return '';
    }
}

/**
 * Formats a distance in kilometers or miles
 * @param {number} value - Distance value
 * @param {string} [unit='km'] - Unit ('km' or 'mi')
 * @param {string} [locale='en-US'] - Locale for number formatting
 * @returns {string} Formatted distance string (e.g., "1,234.5 km")
 */
export function formatDistance(value, unit = 'km', locale = 'en-US') {
    if (typeof value !== 'number' || isNaN(value)) {
        return '';
    }

    const formatter = new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: unit === 'mi' ? 'mile' : 'kilometer',
        unitDisplay: 'short',
        maximumFractionDigits: 1
    });

    return formatter.format(value);
}

/**
 * Formats a percentage value
 * @param {number} value - Value between 0 and 1 (e.g., 0.5 for 50%)
 * @param {string} [locale='en-US'] - Locale for number formatting
 * @returns {string} Formatted percentage string (e.g., "50%")
 */
export function formatPercentage(value, locale = 'en-US') {
    if (typeof value !== 'number' || isNaN(value)) {
        return '';
    }

    return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits: 1
    }).format(value);
}

/**
 * Formats a full name, handling Arabic naming conventions
 * @param {Object} nameParts - { first, middle, last, family }
 * @param {string} [locale='en-US'] - Locale string
 * @returns {string} Formatted full name
 */
export function formatName(nameParts, locale = 'en-US') {
    if (!nameParts || typeof nameParts !== 'object') {
        return '';
    }

    const { first, middle, last, family } = nameParts;
    const parts = [first, middle, last, family].filter(part => part && typeof part === 'string' && part.trim() !== '');

    if (parts.length === 0) {
        return '';
    }

    return parts.join(' ');
}

/**
 * Formats an address in KSA standard format
 * @param {Object} address - Address components
 * @returns {string} Formatted address string
 */
export function formatKSAAddress(address) {
    if (!address || typeof address !== 'object') {
        return '';
    }

    const { buildingNumber, streetName, district, city, postalCode, additionalNumber } = address;

    // Format: Building Street, District
    // City PostalCode - Additional

    const line1Parts = [];
    if (buildingNumber) line1Parts.push(buildingNumber);
    if (streetName) line1Parts.push(streetName);
    if (district) line1Parts.push(district);

    const line2Parts = [];
    if (city) line2Parts.push(city);

    let postalPart = '';
    if (postalCode) {
        postalPart = postalCode;
        if (additionalNumber) {
            postalPart += `-${additionalNumber}`;
        }
    }
    if (postalPart) line2Parts.push(postalPart);

    const line1 = line1Parts.join(' ');
    const line2 = line2Parts.join(' ');

    if (line1 && line2) {
        return `${line1}\n${line2}`;
    }

    return line1 || line2 || '';
}
