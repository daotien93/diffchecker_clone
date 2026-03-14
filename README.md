## Diffchecker Clone

This is a simple **Diffchecker-style** clone with a React frontend and a Node.js/Express backend.

### Structure

- **client**: React + Vite frontend.
- **server**: Node.js + Express backend for diff operations.
- **shared**: Shared constants between frontend and backend.
- **docker**: Dockerfile for containerizing the app.

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Install dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### Run in development

From the project root:

```bash
npm run dev
```

This runs both the frontend and backend concurrently.

### Build frontend

```bash
npm run build
```

### Start backend only

```bash
npm run start
```
