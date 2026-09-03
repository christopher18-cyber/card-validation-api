import { describe,test,expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../server.js';

describe('POST /api/validate - Integration Tests', () => {
  test('should return 200 OK for a valid card', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '4000001234567899' });

    expect(response.status).toBe(200);
    expect(response.body.valid).toBe(true);
    expect(response.body.message).toBe('Card number is valid');
  });

  test('should return 400 Bad Request for an invalid checksum', async () => {
    const response = await request(app)
      .post('/api/validate')
      .send({ cardNumber: '4000001234567890' });

    expect(response.status).toBe(400);
    expect(response.body.valid).toBe(false);
    expect(response.body.error).toBe('Invalid card number checksum');
  });
});