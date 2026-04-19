# Flight Booking System ✈️

A fullstack flight booking web application with dynamic surge pricing, wallet management, and PDF ticket generation.

## Prerequisites

-   **Node.js** v18+
-   **MongoDB** (local or Atlas)
-   **npm** or **yarn**

## Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/NehanshuRathod/Vimaan_Seva.git
cd Vimaan_Seva
```

### 2. Configure environment variables

**Backend:** Create a `.env` file in the root directory:

```env
DB_URI=mongodb+srv://rdfearless:Rudra%4037@cluster0.3ugkow7.mongodb.net
DB_NAME=flight_booking_db
SERVER_PORT=3000
CORS_ORIGIN=http://localhost:5173
```

**Frontend:** Create a `.env` file in the `/client` directory:

```env
VITE_APP_BASEURL=http://localhost:3000/api/v1
```

### 3. Install dependencies

**Backend:**

```bash
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### 4. Start the application

**Terminal 1 - Backend (port 3000):**

```bash
npm run dev
```

**Terminal 2 - Frontend (port 5173):**

```bash
cd client
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

### 6. Set up default user

On first launch, enter this User ID in the navbar input field:

```
6941b10935769b096f02f5ac
```

This is a pre-seeded user with a wallet balance of ₹50,000.
![Pre-Seed](image.png)

## Documentation

-   [DOCS.md](DOCS.md) - Detailed codebase explanation
-   [API.md](API.md) - API endpoints reference
-   [Postman Testing Enviroment](https://rudra-308220.postman.co/workspace/Rudra's-Workspace~83c290ed-787f-45df-88b2-5227470b3e01/collection/43608503-339a159b-6a56-41bb-88d3-134f76a4ba99?action=share&source=copy-link&creator=43608503) - Here you can test the backend

## Author

**Rudra Desai**

## License

ISC
