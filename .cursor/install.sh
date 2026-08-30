#!/usr/bin/env bash
# Idempotent bootstrap for the @wildboar/asn1-parser Cloud Agent environment.
# Installs the three runtimes the library targets (Node is already present in
# the base image; Deno and Bun are added here), installs npm dependencies, and
# produces the ./dist build that the Deno/Bun test entry points import.
set -euo pipefail

# --- Deno -------------------------------------------------------------------
if [ ! -x "$HOME/.deno/bin/deno" ]; then
  curl -fsSL https://deno.land/install.sh | sh
fi

# --- Bun --------------------------------------------------------------------
if [ ! -x "$HOME/.bun/bin/bun" ]; then
  curl -fsSL https://bun.sh/install | bash
fi

# Ensure both runtimes are on PATH for every future interactive shell. The Bun
# installer manages its own ~/.bashrc entry; Deno does not, so add it once.
DENO_LINE='export PATH="$HOME/.deno/bin:$PATH"'
if ! grep -qxF "$DENO_LINE" "$HOME/.bashrc" 2>/dev/null; then
  echo "$DENO_LINE" >> "$HOME/.bashrc"
fi

export PATH="$HOME/.deno/bin:$HOME/.bun/bin:$PATH"

# --- Project dependencies + build ------------------------------------------
npm ci
npm run build
