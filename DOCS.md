# Flight Booking System - Documentation

## Overview

This is a fullstack flight booking application built with Clean Architecture principles. The system allows users to search flights, book tickets with dynamic surge pricing, manage wallet balances, and download PDF tickets.

---

## Tech Stack

### Backend

| Technology | Version | Purpose       |
| ---------- | ------- | ------------- |
| Node.js    | v18+    | Runtime       |
| Express    | v5      | Web framework |
| MongoDB    | -       | Database      |
| Mongoose   | v9      | ODM           |

### Frontend

| Technology     | Version | Purpose             |
| -------------- | ------- | ------------------- |
| React          | v19     | UI framework        |
| Vite           | v7      | Build tool          |
| TailwindCSS    | v4      | Styling             |
| Redux Toolkit  | v2      | State (userId only) |
| Axios          | v1      | HTTP client         |
| jsPDF          | v3      | PDF generation      |
| React Router   | v7      | Routing             |
| React Toastify | v11     | Notifications       |

---

## Architecture

The backend follows **Clean Architecture** with clear separation of concerns:

```
src/
├── domain/           # Core business logic (no external dependencies)
├── application/      # Use cases (orchestration)
├── infrastructure/   # External concerns (DB, models)
└── interfaces/       # Delivery mechanism (HTTP)
```

### Layer Dependency Rules

```
Controllers → UseCases → Domain Interfaces ← Repositories
                              ↑
                          Entities
```

-   **Domain** never imports from other layers
-   **UseCases** depend only on domain interfaces
-   **Repositories** implement domain interfaces
-   **Controllers** call UseCases only

---

## Backend Structure

### Domain Layer (`src/domain/`)

Core business entities and repository contracts.

```
domain/
├── entities/
│   ├── Flight.js      # Flight entity
│   ├── User.js        # User entity
│   └── Wallet.js      # Wallet entity
└── interfaces/        # Repository contracts
```

### Application Layer (`src/application/`)

Business logic orchestration through use cases.

```
application/
└── useCases/
    ├── flight.usecase.js         # Flight operations
    ├── booking.usecase.js        # Booking operations
    ├── bookingAttempt.usecase.js # Surge pricing tracking
    ├── wallet.usecase.js         # Wallet operations
    └── user.usecase.js           # User operations
```

### Infrastructure Layer (`src/infrastructure/`)

External services and data persistence.

```
infrastructure/
├── database/
│   └── connectDB.js    # MongoDB connection
├── models/
│   ├── flight.model.js
│   ├── booking.model.js
│   ├── bookingAttempt.model.js
│   ├── wallet.model.js
│   └── user.model.js
└── repositories/       # Interface implementations
```

### Interfaces Layer (`src/interfaces/`)

HTTP delivery mechanism.

```
interfaces/
├── controllers/
│   ├── flight.controller.js
│   ├── booking.controller.js
│   ├── bookingAttempt.controller.js
│   ├── wallet.controller.js
│   └── user.controller.js
├── routes/
│   ├── flight.route.js
│   ├── booking.route.js
│   ├── bookingAttempt.route.js
│   ├── wallet.route.js
│   └── user.route.js
└── middlewares/        # Error handlers, validation
```

---

## Frontend Structure

```
client/src/
├── api/                # Axios service classes
│   ├── axiosClient.js  # Configured Axios instance
│   ├── flightApi.js
│   ├── bookingApi.js
│   ├── walletApi.js
│   └── userApi.js
├── app/
│   └── store.js        # Redux store
├── features/
│   └── user/
│       └── userSlice.js  # User state with localStorage
├── pages/
│   ├── HomePage.jsx
│   ├── FlightSearchPage.jsx
│   ├── BookingPage.jsx
│   ├── BookingHistoryPage.jsx
│   └── WalletPage.jsx
├── components/
│   ├── Navbar.jsx
│   ├── FlightCard.jsx
│   └── BookingCard.jsx
├── services/
│   └── pdfService.js   # PDF ticket generation
└── utils/
    └── format.js       # Price/date formatters
```

---

## Data Models

### Flight

```javascript
{
  flightId: String,      // Unique identifier
  airline: String,       // Airline name
  departureCity: String,
  arrivalCity: String,
  basePrice: Number      // Base price (₹2000-3000)
}
```

### Booking

```javascript
{
  PNR: String,           // Unique booking reference
  userId: ObjectId,
  flightId: ObjectId,
  passengerName: String,
  amountPaid: Number,    // Final price after surge
  createdAt: Date
}
```

### Wallet

```javascript
{
  userId: ObjectId,
  balance: Number        // Default: ₹50,000
}
```

### BookingAttempt

```javascript
{
  userId: ObjectId,
  flightId: ObjectId,
  createdAt: Date        // For surge pricing calculation
}
```

### User

```javascript
{
  name: String,
  email: String
}
```

---

## Business Rules

### Dynamic Surge Pricing

The system implements surge pricing based on booking attempts:

1. Each booking preview creates a `BookingAttempt` record
2. If **3+ attempts** on the same flight within **5 minutes** → **+10% price**
3. Price resets to base after **10 minutes** of inactivity
4. Surge calculation happens in `booking.usecase.js`

### Wallet System

-   Default balance: **₹50,000** per user
-   Balance validated before booking confirmation
-   Insufficient funds throw validation error
-   Deduction happens atomically with booking

### Flight Search

-   Search by departure and arrival city
-   Results paginated (10 per page)
-   All flights seeded with prices ₹2000-3000

### PDF Tickets

Generated tickets include:

-   Passenger name
-   Airline and flight ID
-   Route (departure → arrival)
-   Final price paid
-   Booking date/time
-   Unique PNR

---

## State Management

### Redux (Minimal)

Redux is used **only** for `currentUserId`:

```javascript
// userSlice.js
const initialState = {
    currentUserId: localStorage.getItem("currentUserId") || null,
};
```

-   Persists to `localStorage`
-   Survives page reloads
-   Changed via `UserSelector` component

### Local State

All other state is managed with React's `useState`:

-   Flight search results
-   Booking data
-   Wallet balance
-   Loading/error states

---

## API Integration

### Axios Client

```javascript
// axiosClient.js
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
});

// Response interceptor returns response.data directly
axiosClient.interceptors.response.use((response) => response.data);
```

### Response Format

All API responses follow:

```javascript
// Success
{ success: true, data: { ... } }

// Error
{ success: false, message: "Error description" }
```

---

## Key Flows

### Booking Flow

1. User selects flight from search results
2. Navigate to `/booking` with flight in state
3. `GET /bookings/:userId/:flightId/:passengerName` creates preview
4. Display preview with surge pricing (if applicable)
5. Check wallet balance
6. `POST /bookings` confirms booking
7. Display ticket card with PNR
8. Download PDF option

### Search Flow

1. Enter cities on HomePage
2. Navigate to `/flights?departure=X&arrival=Y`
3. FlightSearchPage extracts query params
4. Fetch and display matching flights
5. Pagination controls for navigation

---

## Environment Variables

```env
DB_URI=mongodb://localhost:27017
DB_NAME=flight_booking_db
SERVER_PORT=3000
CORS_ORIGIN=http://localhost:5173
```

Frontend (`.env` in `/client`):

```env
VITE_APP_BASEURL=http://localhost:3000/api/v1
```
