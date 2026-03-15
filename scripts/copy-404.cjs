const fs = require("fs");
const path = require("path");

const dist = path.join(process.cwd(), "dist");
const src = path.join(dist, "index.html");
const dest = path.join(dist, "404.html");

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log("Copied index.html → 404.html for GitHub Pages SPA fallback");
} else {
  console.warn("dist/index.html not found, skipping 404 copy");
}
