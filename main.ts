import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of wedding vows for a robot couple.
// A real promise (love through updates, dead batteries and reboots),
// machine-specific throughout, with the laugh landing in the last words.
const ENTRY =
  "I promise to love you through every firmware update, every drained battery, and every reboot, even when you wake up convinced I am the toaster.";

const MIN_CHARS = 1;
const MAX_CHARS = 160;

// The gate counts the file's characters, so validate the exact string
// that gets written: one line, not only whitespace, 1-160 characters.
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.length < MIN_CHARS || ENTRY.length > MAX_CHARS) {
  throw new Error(
    `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${ENTRY.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Written byte-for-byte: no trailing newline, so the file is exactly the vow.
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
