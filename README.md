
# Pink Pulse

Pink Pulse is a discreet e-commerce storefront for intimate wellness products. The project contains a Next.js frontend, an Express API, Prisma migrations, PostgreSQL persistence, and optional M-Pesa STK Push checkout.

## Project Structure

```text
app/             Next.js app entry points and global styles
components/      Storefront UI and checkout components
lib/             Product data, API helpers, and shared types
public/products/ Product images served by the frontend
server/          Express API and Prisma database layer
```

## Requirements

- Node.js 18+
- pnpm 10+
- PostgreSQL database

## Local Development

Install frontend dependencies from the repository root:

```bash
pnpm install
```

Create `server/.env` from `server/.env.example` and set a PostgreSQL connection string and JWT secret. Then initialize Prisma and start the API:

```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

The API runs at `http://localhost:5000`.

In a second terminal, start the Next.js frontend from the repository root:

```bash
pnpm dev
```

The storefront runs at `http://localhost:3000`. If port 3000 is busy, Next.js may choose another available port.

## Environment Variables

### Backend

Keep these variables in `server/.env` locally and in the backend hosting provider's environment settings. Never commit `.env` files or expose these values in frontend code.

```env
PORT=5000
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
JWT_SECRET="replace-with-a-long-random-secret"

MPESA_BASE_URL="https://sandbox.safaricom.co.ke"
MPESA_CONSUMER_KEY="your-sandbox-consumer-key"
MPESA_CONSUMER_SECRET="your-sandbox-consumer-secret"
MPESA_SHORTCODE="174379"
MPESA_PASSKEY="your-sandbox-passkey"
MPESA_CALLBACK_URL="https://your-api-domain.example/api/mpesa/callback"
```

For live M-Pesa, use Safaricom production credentials, your real PayBill or Till number, the production API URL, and a public HTTPS callback URL. Do not mix sandbox credentials with production business numbers.

### Frontend

The frontend only needs the public API URL. Add it to the Vercel or frontend hosting project's Production environment:

```env
NEXT_PUBLIC_API_URL="https://your-api-domain.example/api"
```

After changing a frontend environment variable, redeploy because Next.js embeds it during the build.

## Useful Commands

From the repository root:

```bash
pnpm dev       # Start the frontend
pnpm build     # Create a production build
pnpm start     # Serve the production build
pnpm lint      # Run ESLint, if project configuration is available
```

From `server/`:

```bash
npm run dev    # Start the API with nodemon
npm start      # Start the API in production mode
```

## Deployment

### Frontend on Vercel

1. Import the GitHub repository.
2. Use the repository root as the project root.
3. Add `NEXT_PUBLIC_API_URL` with the deployed API URL and select Production.
4. Deploy or redeploy after saving the variable.

### Backend on Render

Create a Node Web Service with:

```text
Root Directory: server
Build Command: npm install && npx prisma generate && npx prisma migrate deploy
Start Command: npm start
```

Add all backend variables from the backend section in Render's Environment settings. Render supplies `PORT` automatically; the API listens on that value.

The API health endpoint is:

```text
GET https://your-api-domain.example/
```

## API Routes

The API currently exposes routes under:

```text
/api/auth
/api/categories
/api/products
/api/orders
/api/cart
/api/checkout
/api/mpesa
```

M-Pesa checkout uses:

```text
POST /api/mpesa/stkpush
GET  /api/mpesa/query/:checkoutRequestId
POST /api/mpesa/callback
```

## Storage Notes

Images in `public/products` are frontend assets and deploy with the Next.js application. Files written to a hosting provider's local filesystem are not durable. For admin-uploaded product images, use Cloudinary or another object-storage provider and save the returned HTTPS URL in the `ProductImage.imageUrl` field.

The current M-Pesa callback acknowledges and logs Safaricom's response. It does not yet update an order's payment status in the database.

## Security

- Keep `server/.env` out of Git.
- Use separate secrets for local, staging, and production environments.
- Rotate any database, JWT, M-Pesa, or storage credentials that have been exposed.
- Never use `NEXT_PUBLIC_` for private credentials.
