# Payment Service

This service handles creation of payment intents.

## Endpoints

### POST /api/payments

Creates a new payment with an idempotency key.

**Body**
```json
{
  "merchantId": "uuid",
  "customerId": "uuid",
  "amount": 4999,
  "product": "Surfboard",
  "idempotencyKey": "unique-key-123"
}
```

**Response**
```json
{
  "id": "uuid",
  "merchantId": "uuid",
  "status": "created",
  "...": "..."
}