/** One entry in a proposal's table of contents. */
export interface Heading {
  id: string;
  title: string;
  depth: number;
}

/** The slug a heading gets in the rendered document, and in its `#` link. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Pull h2–h4 out of markdown source.
 *
 * Fenced blocks are skipped: proposals are full of shell transcripts and ASCII
 * diagrams whose `#` comment lines are not headings.
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const title = match[2].trim();
    headings.push({ id: headingId(title), title, depth: match[1].length });
  }

  return headings;
}
