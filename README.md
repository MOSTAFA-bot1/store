# MODA Store

## Run the app

- `npm run dev` starts Vite and the API together.
- `npm run dev:all` is an alias for `npm run dev`.
- `npm run dev:client` starts only the Vite client.
- `npm run dev:api` starts the API with automatic restart.
- `npm run build` builds the client.

Vite proxies `/api` and `/uploads` to `http://localhost:5000`. The API uses SQLite and creates `data/moda.sqlite` automatically; uploaded profile pictures are written under `uploads/`. Both directories are ignored by Git.

## Accounts

In development, the API seeds this administrator on first startup:

- Email: `admin@moda.sa`
- Password: `Admin@12345`

New customer accounts can be created from the registration screen. Sessions use a signed, `httpOnly`, `SameSite=Lax` cookie. Passwords are stored as bcrypt hashes. Password-recovery tokens are returned by the API only in development; production email delivery requires configuring a mail provider.

## Production setup

Copy `.env.example` to `.env`, set `NODE_ENV=production`, provide a random `JWT_SECRET` of at least 32 characters, and set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to secure values before the first start. The development administrator is not seeded in production. Serve the client and API over HTTPS and back up the SQLite database and uploaded images.

The API currently supports authentication, account profiles and addresses, product/catalog reads, cart, wishlist, checkout/order history, settings, and customer listing. Payment processing is not connected; checkout is a demo flow and must not be used to take real payments.
