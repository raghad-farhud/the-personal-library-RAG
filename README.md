# Library Mind

A cozy, modern personal knowledge library frontend for a RAG system. Upload books, PDFs, quotes, insights, and notes — then query your collected wisdom through a calm, bookish interface.

Built with React + Vite + TypeScript + Tailwind CSS.

## Features

- **Knowledge Ingestion** — Upload PDFs, add quotes, insights, and notes with rich metadata
- **Ask Your Library** — Query your knowledge base with optional filters (source type, language, author, favorites)
- **Answer Display** — View answers with confidence scores and source cards showing relevance
- **Webhook Integration** — Connect to n8n or any webhook endpoint for ingestion and querying
- **Mock Mode** — Built-in mock responses for development without a backend
- **Dashboard** — Lightweight stats strip showing uploads, last query, and endpoint status
- **Local Settings** — Webhook URLs stored in localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173/the-personal-library/`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Deploy to GitHub Pages

### Option 1: Using gh-pages (automated)

```bash
npm run deploy
```

This builds the project and pushes the `dist` folder to the `gh-pages` branch.

> Make sure your GitHub repository is named `the-personal-library` and GitHub Pages is configured to serve from the `gh-pages` branch.

### Option 2: GitHub Actions (CI/CD)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in your repo settings, set Pages source to "GitHub Actions".

### Changing the Base Path

If your repository has a different name, update the `base` field in `vite.config.ts`:

```ts
base: "/your-repo-name/",
```

## Configuration

### Mock Mode

The app ships with mock mode enabled by default. To switch between mock and real webhook calls, edit `src/lib/mock-data.ts`:

```ts
export const USE_MOCK = true;  // Set to false for real webhook calls
```

### Webhook URLs

Configure your n8n (or other) webhook endpoints in the Settings section of the app. URLs are persisted in `localStorage`.

## Project Structure

```
src/
├── components/
│   ├── forms/           # Form components for each ingestion type
│   │   ├── PdfUploadForm.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── InsightForm.tsx
│   │   └── NoteForm.tsx
│   ├── layout/
│   │   └── AppShell.tsx
│   ├── results/         # Answer and source display
│   │   ├── AnswerPanel.tsx
│   │   └── SourceCard.tsx
│   ├── sections/        # Main page sections
│   │   ├── HeaderSection.tsx
│   │   ├── DashboardSection.tsx
│   │   ├── IngestionSection.tsx
│   │   ├── AskSection.tsx
│   │   └── SettingsSection.tsx
│   └── ui/              # Reusable UI primitives
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── FileUpload.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── StatusMessage.tsx
│       ├── Tabs.tsx
│       ├── TagInput.tsx
│       ├── Textarea.tsx
│       └── Toggle.tsx
├── hooks/
│   ├── useDashboardStats.ts
│   ├── useFormSubmit.ts
│   └── useWebhookConfig.ts
├── lib/
│   ├── api.ts           # Webhook submission utilities
│   ├── cn.ts            # Tailwind class merge utility
│   ├── mock-data.ts     # Mock responses and config
│   └── storage.ts       # localStorage helpers
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx
├── main.tsx
└── index.css            # Tailwind theme configuration
```

## Webhook Payloads

### PDF Upload (multipart/form-data)

Fields: `source_type`, `title`, `author`, `language`, `tags` (JSON array), `category`, `date_read`, `favorite`, `notes`, `file`

### Quote / Insight / Note (JSON)

See `src/types/index.ts` for exact payload shapes.

### Ask (JSON)

```json
{
  "question": "How do habits shape identity?",
  "source_type": "",
  "language": "",
  "author": "",
  "title": "",
  "favorites_only": false
}
```

## Tech Stack

- **React 19** — UI framework
- **Vite 6** — Build tool
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Styling
- **Lucide React** — Icons
- **clsx + tailwind-merge** — Class utilities

## License

MIT
