# Yoventa Limited: Next.js storefront

Single [Next.js](https://nextjs.org/) 15 app (App Router) with **Route Handlers** for session auth, catalog (DummyJSON), profile, and optional OpenAI chat. Styling: [Tailwind CSS](https://tailwindcss.com/) 4.

Behavior and product rules are described in [build.instruction.md](./build.instruction.md). Public catalog routes use the `api/bestbuy` prefix (same as before).

## Prerequisites

- Node.js 20.9+

## Environment

Copy `.env.example` to `.env` for local development:

- **`SESSION_SECRET`**: long random string used to sign the session cookie. **Required in production** (Netlify site environment variables).
- **`OPENAI_API_KEY`**: optional; enables the product assistant. Set `OPENAI_MODEL` if you want a model other than `gpt-4o-mini`.
- **`NETLIFY`** / **`NETLIFY_BLOBS_READ_WRITE_TOKEN`**: set automatically on Netlify when using Blobs; local dev uses `data/users.json`.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). API routes are same-origin under `/api/*` (e.g. `/api/health`, `/api/user/me`).

## Build

```bash
npm run build
npm start
```

## Netlify

1. Connect the repo; build command `npm run build` (see [netlify.toml](./netlify.toml)).
2. Install the official Next runtime via `@netlify/plugin-nextjs` (already in devDependencies).
3. In **Site settings → Environment variables**, set at least `SESSION_SECRET`. Add `OPENAI_API_KEY` if you use chat.
4. User accounts on Netlify use **Netlify Blobs** when `NETLIFY=true` (or when a blobs token is present); otherwise the app reads/writes `data/users.json` (suitable for local dev). Enable [Netlify Blobs](https://docs.netlify.com/blobs/overview/) on the site if you rely on persisted registration data in production.

## Project layout

- `src/app/`: pages and `api/**/route.ts` handlers
- `src/lib/`: session, catalog, storage, etc.
- `data/users.json`: seed / local user store
