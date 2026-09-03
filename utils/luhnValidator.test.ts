import { describe, test, expect } from '@jest/globals';
import { validateCardNumber } from './luhnValidator.js';

describe('Luhn Validator Unit Tests', () => {
  test('should pass for valid Visa card numbers', () => {
    const result = validateCardNumber('4000001234567899');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test('should pass for valid Mastercard numbers with formatting', () => {
    const result = validateCardNumber('5399-8344-7852-0257');
    expect(result.isValid).toBe(true);
    expect(result.cleanNumber).toBe('5399834478520257');
  });

  test('should fail when checksum calculation is wrong', () => {
    const result = validateCardNumber('4000001234567890');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Invalid card number checksum');
  });

  test('should reject non-string input types', () => {
    const result = validateCardNumber(4000001234567899 as unknown);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Card number must be a string');
  });

  test('should reject inputs containing letters', () => {
    const result = validateCardNumber('4532ABCD12830366');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Card number must contain only numeric digits');
  });

  test('should reject inputs shorter than 13 digits', () => {
    const result = validateCardNumber('123456789');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Card number length must be between 13 and 19 digits');
  });
});