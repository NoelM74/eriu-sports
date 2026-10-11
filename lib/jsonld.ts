/** Serialises structured data for a <script type="application/ld+json"> tag. "<" is escaped so no text can close the tag early. */
export function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
