# Flight Booking System - API Reference

Base URL: `http://localhost:3000/api/v1`

---

## Flights

### Get All Flights

```http
GET /flights
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Results per page (default: 10) |

**Response:**

```json
{
    "success": true,
    "data": {
        "docs": [
            {
                "_id": "...",
                "flightId": "FL001",
                "airline": "Air India",
                "departureCity": "Mumbai",
                "arrivalCity": "Delhi",
                "basePrice": 2500
            }
        ],
        "totalDocs": 20,
        "page": 1,
        "totalPages": 2
    }
}
```

---

### Search Flights

```http
GET /flights/search
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| departureCity | string | Yes | Departure city |
| arrivalCity | string | Yes | Arrival city |
| page | number | No | Page number |
| limit | number | No | Results per page |

**Response:**

```json
{
  "success": true,
  "data": {
    "docs": [...],
    "totalDocs": 5,
    "page": 1,
    "totalPages": 1
  }
}
```

---

### Get Flight by ID

```http
GET /flights/:id
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "flightId": "FL001",
        "airline": "Air India",
        "departureCity": "Mumbai",
        "arrivalCity": "Delhi",
        "basePrice": 2500
    }
}
```

---

### Get Flight Price

```http
GET /flights/:id/price
```

**Response:**

```json
{
    "success": true,
    "data": {
        "basePrice": 2500,
        "currentPrice": 2750
    }
}
```

---

### Create Flight

```http
POST /flights
```

**Request Body:**

```json
{
    "flightId": "FL021",
    "airline": "Vistara",
    "departureCity": "Bangalore",
    "arrivalCity": "Chennai",
    "basePrice": 2200
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "flightId": "FL021",
        "airline": "Vistara",
        "departureCity": "Bangalore",
        "arrivalCity": "Chennai",
        "basePrice": 2200
    }
}
```

---

## Bookings

### Create Booking Preview

Creates a booking preview and records a booking attempt for surge pricing.

```http
GET /bookings/:userId/:flightId/:passengerName
```

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | string | User's MongoDB ID |
| flightId | string | Flight's MongoDB ID |
| passengerName | string | Passenger name |

**Response:**

```json
{
    "success": true,
    "data": {
        "userId": "...",
        "flightId": "...",
        "passengerName": "Rudra Desai",
        "basePrice": 2500,
        "amountToBePaid": 2750,
        "surgeApplied": true,
        "surgePercentage": 10
    }
}
```

---

### Confirm Booking

```http
POST /bookings
```

**Request Body:**

```json
{
    "userId": "...",
    "flightId": "...",
    "passengerName": "Rudra Desai"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "PNR": "ABC123XYZ",
        "userId": "...",
        "flightId": "...",
        "passengerName": "Rudra Desai",
        "amountPaid": 2750,
        "createdAt": "2025-12-17T10:30:00.000Z"
    }
}
```

---

### Get Booking by ID

```http
GET /bookings/:id
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "PNR": "ABC123XYZ",
        "userId": "...",
        "flightId": "...",
        "passengerName": "Rudra Desai",
        "amountPaid": 2750,
        "createdAt": "2025-12-17T10:30:00.000Z"
    }
}
```

---

### Get Booking by PNR

```http
GET /bookings/pnr/:pnr
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "PNR": "ABC123XYZ",
        "userId": "...",
        "flightDetails": {
            "_id": "...",
            "airline": "Air India",
            "departureCity": "Mumbai",
            "arrivalCity": "Delhi"
        },
        "passengerName": "Rudra Desai",
        "amountPaid": 2750,
        "createdAt": "2025-12-17T10:30:00.000Z"
    }
}
```

---

### Get User Booking History

```http
GET /bookings/user/:userId/history
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Results per page (default: 5) |

**Response:**

```json
{
    "success": true,
    "data": {
        "docs": [
            {
                "_id": "...",
                "PNR": "ABC123XYZ",
                "flightDetails": {
                    "_id": "...",
                    "airline": "Air India",
                    "departureCity": "Mumbai",
                    "arrivalCity": "Delhi"
                },
                "passengerName": "Rudra Desai",
                "amountPaid": 2750,
                "createdAt": "2025-12-17T10:30:00.000Z"
            }
        ],
        "totalDocs": 10,
        "page": 1,
        "totalPages": 2
    }
}
```

---

## Wallet

### Get Wallet Balance

```http
GET /wallet/:userId
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "userId": "...",
        "balance": 50000
    }
}
```

---

### Add Money to Wallet

```http
PATCH /wallet/:userId/add
```

**Request Body:**

```json
{
    "amount": 5000
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "userId": "...",
        "balance": 55000
    }
}
```

---

### Deduct from Wallet

```http
PATCH /wallet/:userId/deduct
```

**Request Body:**

```json
{
    "amount": 2750
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "userId": "...",
        "balance": 47250
    }
}
```

---

### Create Wallet

```http
POST /wallet
```

**Request Body:**

```json
{
    "userId": "..."
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "userId": "...",
        "balance": 50000
    }
}
```

---

## Users

### Create User

```http
POST /users
```

**Request Body:**

```json
{
    "name": "Rudra Desai",
    "email": "rudra@example.com"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "name": "Rudra Desai",
        "email": "rudra@example.com"
    }
}
```

---

### Get User

```http
GET /users/:id
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "name": "Rudra Desai",
        "email": "rudra@example.com"
    }
}
```

---

### Update User

```http
PATCH /users/:id
```

**Request Body:**

```json
{
    "name": "Rudra D"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "name": "Rudra D",
        "email": "rudra@example.com"
    }
}
```

---

### Delete User

```http
DELETE /users/:id
```

**Response:**

```json
{
    "success": true,
    "data": {
        "message": "User deleted successfully"
    }
}
```

---

## Booking Attempts

Used internally for surge pricing calculation.

### Create Attempt

```http
POST /bookingAttempts
```

**Request Body:**

```json
{
    "userId": "...",
    "flightId": "..."
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "userId": "...",
        "flightId": "...",
        "createdAt": "2025-12-17T10:30:00.000Z"
    }
}
```

---

### Get Recent Attempts Count

```http
GET /bookingAttempts/flight/:userId/:flightId/count
```

**Response:**

```json
{
    "success": true,
    "data": {
        "count": 3
    }
}
```

---

## Error Responses

All errors follow this format:

```json
{
    "success": false,
    "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Description           |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 404  | Not Found             |
| 500  | Internal Server Error |
