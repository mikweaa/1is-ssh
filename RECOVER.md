# Fix "Not found." on Register

"Not found." means the browser got a **404** when calling `/api/auth/register`. Common causes:

- **Docker:** API can't connect to DB (e.g. you changed `POSTGRES_PASSWORD` in `.env` but the DB volume still has the old password), so the API never starts and requests return 404.
- **Local dev:** API not running on port 3000, or frontend not using the proxy.

---

## If you're using Docker (e.g. https://1nteger.org)

### 1. Reset the stack with your new password

You changed `POSTGRES_PASSWORD` in `.env`, but the existing Postgres data was created with the **old** password. The API uses the new password and gets "password authentication failed", so it never listens and you get 404.

**Run these in your terminal** (you'll be asked for your sudo password for the `rm`):

```bash
cd /home/elvis/docker/stacks/1is-grade-calculator

# Stop everything
docker compose down

# Remove old DB data so Postgres re-initializes with the NEW password from .env
# (Needs sudo because the folder was created by the Postgres container.)
sudo rm -rf .data/postgres_data

# Start again (reads .env; DB will init with new password)
docker compose up -d
```

### 2. Check that the API is running

```bash
docker compose ps
```

You should see `api` and `db` with status **Up**.

```bash
docker compose logs api --tail 30
```

You should see something like `Server listening on port 3000`. If you see DB connection errors, the password in `.env` doesn’t match what Postgres has (step 1 should fix that).

### 3. Try Register again

Open **https://1nteger.org** (or your real URL), go to Register, and submit the form. It should hit the API and either succeed or show a real error (e.g. "Email already registered").

---

## If you're running locally (npm run dev)

### 1. Start the API

```bash
cd /home/elvis/docker/stacks/1is-grade-calculator/api
npm install
npm run dev
```

Leave it running. You should see it listening on port 3000.

### 2. Start the frontend (with proxy)

```bash
cd /home/elvis/docker/stacks/1is-grade-calculator
npm run dev
```

Open **http://localhost:5173**. The Vite proxy will send `/api` to the API on port 3000.

### 3. Try Register again

Use the form at http://localhost:5173. "Not found." should go away if the API is up on 3000.

---

## Quick test: is the API reachable?

- **Docker:** open `https://1nteger.org/api/` in the browser (or `curl -k https://1nteger.org/api/`). You should see `{"service":"sis-grade-api","ok":true}`.
- **Local:** open `http://localhost:3000/` (with API running). Same JSON.

If that fails, the API isn’t reachable; fix that first (logs, container status, or start API locally).
