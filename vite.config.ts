import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

/**
 * GitHub Pages cannot send HTTP headers, so CSP ships as a meta tag.
 * MapLibre + Nominatim need broader connect-src / worker-src than Automexa.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-eval' blob:",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org https://demotiles.maplibre.org https://*",
  "form-action 'self' mailto:",
  "upgrade-insecure-requests",
].join("; ");

function securityHeaders(): Plugin {
  return {
    name: "inject-security-meta",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`,
      );
    },
  };
}

// Custom domain (msbt.co.uk) → base '/' like Automexa
export default defineConfig({
  plugins: [react(), securityHeaders()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
