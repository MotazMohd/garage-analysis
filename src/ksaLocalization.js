function normalizeSaudiPhoneNumber(input) {
  if (input === null || input === undefined) {
    return null;
  }

  const digits = String(input).replace(/[^\d+]/g, "");
  const cleaned = digits.startsWith("+") ? digits.slice(1) : digits;

  let national = "";
  if (cleaned.startsWith("966")) {
    national = cleaned.slice(3);
  } else if (cleaned.startsWith("0")) {
    national = cleaned.slice(1);
  } else {
    national = cleaned;
  }

  if (!/^5\d{8}$/.test(national)) {
    return null;
  }

  return `+966${national}`;
}

function formatSarCurrency(amount, locale = "ar-SA") {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    throw new TypeError("Amount must be a valid number");
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export {
  normalizeSaudiPhoneNumber,
  formatSarCurrency,
};
