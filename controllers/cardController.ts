import { Request, Response } from 'express';
import { validateCardNumber } from '../utils/luhnValidator.js';
import logger from '../utils/logger.js';

export async function validateCardController(req: Request, res: Response): Promise<Response> {
    logger.info("Card validation endppoint hitted.")
  const { cardNumber } = req.body;

  // Local Luhn Validation Check -> (main implemenatation)
  const result = validateCardNumber(cardNumber);

  if (!result.isValid) {
    return res.status(400).json({
      valid: false,
      error: result.error
    });
  }

  let metadata = null;

  //Safe External BIN Lookup ->  extra work (Fails gracefully if API ->
  // is down but doesn't stop the first one (luhn algorithm) from working)
  try {
    const bin = result.cleanNumber?.slice(0, 6);
    const apiResponse = await fetch(`https://lookup.binlist.net/${bin}`, {
      headers: { 'Accept-Version': '3' }
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      metadata = {
        scheme: data.scheme || 'Unknown',
        type: data.type || 'Unknown',
        bank: data.bank?.name || 'Unknown',
        country: data.country?.name || 'Unknown'
      };
    }
  } catch (error) {
    logger.error("BIN lookup service failed or timed out. Continuing with standard response.")
  }

  return res.status(200).json({
    valid: true,
    message: 'Card number is valid',
    metadata
  });
}