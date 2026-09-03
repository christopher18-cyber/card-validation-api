export interface ValidationResult {
  isValid: boolean;
  cleanNumber?: string;
  error?: string;
}

export function validateCardNumber(cardNumber: unknown): ValidationResult {
  if (typeof cardNumber !== 'string') {
    return { isValid: false, error: 'Card number must be a string' };
  }

  // Strip spaces and hyphens
  const cleanNumber = cardNumber.replace(/[\s-]/g, '');

  if (!cleanNumber) {
    return { isValid: false, error: 'Card number cannot be empty' };
  }

  // Numeric digit check
  if (!/^\d+$/.test(cleanNumber)) {
    return { isValid: false, error: 'Card number must contain only numeric digits' };
  }

  // Length constraints check (13-19 digits)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { isValid: false, error: 'Card number length must be between 13 and 19 digits' };
  }

  // Luhn Algorithm Check
  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const isValid = sum % 10 === 0;

  return {
    isValid,
    cleanNumber,
    error: isValid ? undefined : 'Invalid card number checksum'
  };
}