import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { RFCEntry } from '@/lib/source';

/**
 * The lifecycle badge. Colour comes from the `data-status` table in global.css,
 * so a new status is one CSS line and never a lookup object in a page.
 */
export function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <span className="rfc-badge" data-status={status}>
      {status}
    </span>
  );
}

/** One proposal as a list row. Every listing on the site uses this. */
export function ProposalRow({ entry }: { entry: RFCEntry }) {
  return (
    <Link href={entry.url} className="rfc-row">
      <span className="rfc-mono rfc-small rfc-muted" style={{ width: '5.5rem', flex: 'none' }}>
        {entry.label}
      </span>
      <span className="rfc-truncate rfc-small" style={{ flex: 1, fontWeight: 500 }}>
        {entry.title}
      </span>
      <StatusBadge status={entry.status} />
      <ArrowRight size={16} className="rfc-muted" />
    </Link>
  );
}
