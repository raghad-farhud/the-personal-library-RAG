# Deploy to GitHub – Guide

This guide walks you through pushing the project to GitHub and deploying it (e.g. GitHub Pages).

---

## 1. Prepare the repo

- **No secrets in the repo.** Your `.gitignore` already excludes `.env`. Never commit real keys or passwords.
- **Use `.env.example`** as a template. Copy it to `.env` locally and fill in real values only on your machine (or in CI secrets).

---

## 2. Push to GitHub

### If you don’t have a GitHub repo yet

1. Create a new repository on [github.com/new](https://github.com/new).
   - The app’s **base path** must match your repo name (e.g. repo `the-personal-library-RAG` → site at `.../the-personal-library-RAG/`). It’s set in `vite.config.ts` via `base` (default `"/the-personal-library-RAG/"`). For a different repo name, set the `VITE_BASE_PATH` secret (e.g. `"/your-repo-name/"`) so the build uses the correct asset paths.
2. Don’t initialize with a README (you already have one).

### Push from your machine

From the project root:

```bash
git remote add origin https://github.com/YOUR_USERNAME/the-personal-library.git
git branch -M main
git push -u origin main
```

Use your GitHub username and repo name. If the repo already has a `main` branch and you have other branches, adjust as needed.

---

## 3. Deploy to GitHub Pages

You can deploy either with the **gh-pages** npm script or with **GitHub Actions**. Choose one.

### Option A: Deploy with `gh-pages` (manual)

1. Install and build:
   ```bash
   npm ci
   npm run build
   ```
2. Deploy the `dist` folder to the `gh-pages` branch:
   ```bash
   npx gh-pages -d dist
   ```
   Or use the script:
   ```bash
   npm run deploy
   ```
3. On GitHub: **Settings → Pages** → set source to **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**. Save.
4. Your site will be at `https://YOUR_USERNAME.github.io/the-personal-library/` (or your repo name).

### Option B: Deploy with GitHub Actions (automatic on push)

1. The workflow is already in `.github/workflows/deploy.yml`. It runs on every push to `main`.
2. On GitHub: **Settings → Pages** → set source to **GitHub Actions** (not “Deploy from a branch”). Save.
3. Push to `main`; the workflow will build and deploy. The site URL is the same as above.

**Using your backend (Supabase, webhooks, auth):**  
Add repository secrets so the build can inject env vars:

- **Settings → Secrets and variables → Actions → New repository secret**
- Add (only the ones you use):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_AUTH_USERNAME`
  - `VITE_AUTH_PASSWORD`
  - `VITE_INGEST_WEBHOOK_URL`
  - `VITE_ASK_WEBHOOK_URL`

If these are not set, the build still succeeds and the app loads; Library and Ask will show a “Supabase not configured” message until you add the secrets and redeploy.

---

## 4. After deployment

- **SPA routing:** The project copies `index.html` to `404.html` so GitHub Pages serves the app for client-side routes (e.g. `/the-personal-library/ask`).
- **Repo name vs URL:** If you used a different repo name, set `base` in `vite.config.ts` to `"/your-repo-name/"` and redeploy.
- **Custom domain:** You can set a custom domain under **Settings → Pages** and adjust `base` if needed.

For more detail on the app itself (mock mode, webhooks, structure), see [README.md](README.md).
