# Card Validation API

A lightweight, robust, and fully typed RESTful API built with **Node.js**, **Express**, and **TypeScript** (ES Modules) that validates credit and debit card numbers using the **Luhn Algorithm (Mod 10)**.

---

## Features

- **Luhn Checksum Verification:** Pure local calculation to verify card validity without external dependencies.
- **Input Sanitization:** Handles spaces, hyphens, non-numeric characters, empty strings, and invalid lengths (13–19 digits).
- **Graceful BIN Lookup Enhancement:** Attempts an optional third-party lookup for card brand and issuing bank details, falling back cleanly if the third-party service is unavailable.
- **Strict TypeScript Compliance:** Configured with `"strict": true` and modern `"nodenext"` ES Modules (`"type": "module"`).

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Module System:** ES Modules (ESM)

---

## Project Structure

```text
card-validation-api/
├── controllers/
│   └── cardController.ts     # Handles incoming HTTP requests & BIN lookup logic
├── routes/
│   └── cardRoutes.ts         # Express route definitions
├── utils/
│   ├── logger.ts             # Winston logger for request tracking & error logs
│   ├── luhnValidator.test.ts # Jest unit tests for Mod-10 checksum validation
│   └── luhnValidator.ts      # Pure function for Luhn algorithm & input checks
├── .env                      # Environment variables
├── .gitignore                # Git ignore configuration
├── combined.log              # Application log output file
├── error.log                 # Error log output file
├── jest.config.json          # Jest test runner & ESM transformer settings
├── package-lock.json         # Locked dependency tree for reproducible builds
├── package.json              # Project metadata, scripts, and dependencies
├── README.md                 # Project documentation
├── server.ts                 # Express app initialization & server entrypoint
└── tsconfig.json             # TypeScript compiler configuration
```

---

## API Reference

### Validate Card Number

Validates a payment card number against the Luhn checksum and returns validation status and optional metadata.

- **Endpoint:** `/api/validate`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

#### Request Body (Valid Card with BIN Metadata)

```json
{
  "cardNumber": "4000001234567899"
}
```

#### Successful Response (200 OK)

```json
{
  "valid": true,
  "message": "Card number is valid",
  "metadata": {
    "scheme": "visa",
    "type": "credit",
    "bank": "Intl Hdqtrs-Center Owned",
    "country": "United States of America (the)"
  }
}
```


> **Note:** If the external BIN lookup service is offline or rate-limited, metadata fields will default to `"Unknown"` while `valid` remains `true`.


#### Successful Response (BIN Fallback / Unknown Issuer)

```json
{
  "valid": true,
  "message": "Card number is valid",
  "metadata": {
    "scheme": "Unknown",
    "type": "Unknown",
    "bank": "Unknown",
    "country": "Unknown"
  }
}
```


#### Error Response (400 Bad Request - Failed Luhn Checksum)

**Request:**
```json
{
  "cardNumber": "4000001234567890"
}
```

**Response:**
```json
{
  "valid": false,
  "error": "Invalid card number checksum"
}
```

---

## Installation & Setup

### Prerequisites
Ensure you have Node.js (v18 or higher) and npm installed on your system.

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/christopher18-cyber/card-validation-api.git
   cd card-validation-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode:**
   ```bash
   npm run dev
   ```

4. **Run automated unit tests:**
   ```bash
   npm test
   ```

5. **Build and start for production:**
   ```bash
   npm run build
   npm start
   ```

The server will be available at `http://localhost:3000`.

---

## License

ISC