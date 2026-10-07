#!/usr/bin/env bash
# Replace the SITE_URL placeholder with your real production URL everywhere
# (canonical tags, Open Graph/Twitter tags, JSON-LD, sitemap.xml, robots.txt, config.js).
#
# Usage (run from the website folder):
#   ./scripts/set-site-url.sh https://caplink.example
#   ./scripts/set-site-url.sh https://technooracle-development.github.io/Caplink-Website
#
# No trailing slash. Works on macOS and Linux (uses perl, which both include).
set -euo pipefail
NEW="${1:-}"
if [[ -z "$NEW" || "$NEW" != https://* ]]; then
  echo "Usage: $0 https://your-production-url   (no trailing slash)" >&2; exit 1
fi
NEW="${NEW%/}"
OLD="https://YOUR_PRODUCTION_URL_HERE"
cd "$(dirname "$0")/.."
FILES=$(grep -rl "$OLD" --include='*.html' --include='*.xml' --include='*.txt' --include='*.js' . || true)
if [[ -z "$FILES" ]]; then echo "No placeholder found — already set?"; exit 0; fi
for f in $FILES; do perl -pi -e "s#\Q$OLD\E#$NEW#g" "$f"; echo "updated $f"; done
# 404.html uses <base href="/">; point it at the site root path (needed for GitHub Pages project sites)
PATH_PART=$(perl -e '$_=shift; s#^https://[^/]+##; print "$_/"' "$NEW")
perl -pi -e "s#<base href=\"[^\"]*\">#<base href=\"$PATH_PART\">#" 404.html
echo "404.html base href -> $PATH_PART"
echo "Done. Re-submit sitemap.xml in Google Search Console after deploying."
