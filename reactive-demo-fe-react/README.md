# Reactive Demo — React

Basic React port of [reactive-demo-fe](../reactive-demo-fe): browse airlines by country and toggle favorites against the reactive backend.

Built with [Vite](https://vite.dev/).

## Prerequisites

Start the backend on port 8080 (see [reactive-demo-backend](../reactive-demo-backend) or [reactive-demo-backend-flux](../reactive-demo-backend-flux)).

## Development

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). API requests to `/api` are proxied to `http://localhost:8080` (see `vite.config.js`).

The dev server listens on all interfaces by default (`server.host: true`).
