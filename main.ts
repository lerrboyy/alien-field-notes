// Alien Field Notes: The Two Day Earth Review
// A one-line review of Earth left by an alien tourist.
// The program holds the entry text, validates it against the
// competition gate, writes it byte-exact to <OUTPUT_DIR>/entry.txt,
// then reads the file back and verifies it before reporting success.
// No dependencies, no network. Node 22.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Beautiful planet, five stars for the oceans, one star because the dominant species invented a machine that thinks, then spent all day arguing with it about whether it thinks.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count characters as Unicode code points, the same way the gate
// measures the entry (so an astral character counts once, not twice).
const length = [...ENTRY].length;
if (length < MIN_CHARS || length > MAX_CHARS) {
  fail(`entry is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
}

// The entry must be exactly one line: no line breaks, no paragraph
// separators, and no leading or trailing whitespace.
if (/[\n\r\u2028\u2029]/.test(ENTRY)) {
  fail("entry contains a line break");
}
if (ENTRY !== ENTRY.trim()) {
  fail("entry has leading or trailing whitespace");
}

// No control characters (including DEL) may sneak into the text.
// Tab is also rejected: it is whitespace, not part of a clean review line,
// and would look like padding inside the entry.
for (const ch of ENTRY) {
  const code = ch.codePointAt(0);
  if (code < 0x20 || code === 0x7f) {
    fail(`entry contains control character U+${code.toString(16).padStart(4, "0")}`);
  }
}

// An entry of only whitespace would fail the gate; guard it here too.
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}

const outputDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read the file back and verify it byte-for-byte before claiming success:
// compare the raw bytes, not just the decoded string, so an encoding
// drift (e.g. a stray BOM or a re-encoded character) cannot slip past.
const writtenBytes = readFileSync(outPath);
const expectedBytes = Buffer.from(ENTRY, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  fail("verification failed: file bytes differ from the entry text");
}
const written = writtenBytes.toString("utf8");
if (written !== ENTRY) {
  fail("verification failed: file content differs from the entry text");
}

console.log(
  `wrote ${outPath} (${length} characters, ${expectedBytes.length} bytes, 1 line)`,
);
