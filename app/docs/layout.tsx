import type { ReactNode } from 'react';
import { DocsShell } from '@/components/docs-shell';
import { SiteFooter } from '@/components/chrome';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsShell>{children}</DocsShell>
      <SiteFooter />
    </>
  );
}
