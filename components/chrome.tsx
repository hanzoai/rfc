import Link from 'next/link';
import { Github, Globe, Linkedin, MessageCircle, Send, Twitter, Youtube } from 'lucide-react';
import { Button } from '@hanzo/ui';
import { Logo, Lockup } from './logo';
import { ThemeToggle } from './theme-toggle';
import config, { type SocialLink } from '@/rfc.config';

const socialIcon: Record<SocialLink['platform'], typeof Github> = {
  github: Github,
  twitter: Twitter,
  discord: MessageCircle,
  telegram: Send,
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe,
};

/** The one header. Every full-width page mounts this; nothing rolls its own. */
export function SiteHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="rfc-header">
      <div className="rfc-shell">
        <Link href="/" aria-label={config.name}>
          <Lockup size={20} />
        </Link>
        <div className="rfc-cluster" style={{ '--gap': '0.75rem' } as React.CSSProperties}>
          {children}
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href="/docs">Browse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

/** The one footer, driven entirely by `rfc.config.ts`. */
export function SiteFooter() {
  const { footer } = config;

  return (
    <footer className="rfc-footer">
      <div className="rfc-shell rfc-stack" style={{ '--gap': '2rem' } as React.CSSProperties}>
        <div className="rfc-grid" data-cols="4">
          {footer.sections.map((section) => (
            <nav key={section.title} className="rfc-stack" style={{ '--gap': '0.5rem' } as React.CSSProperties}>
              <p className="rfc-small" style={{ fontWeight: 600, margin: 0 }}>
                {section.title}
              </p>
              {section.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rfc-link rfc-small"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} href={link.href} className="rfc-link rfc-small">
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          ))}
        </div>

        <div
          className="rfc-cluster"
          data-between
          style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}
        >
          <span className="rfc-cluster rfc-small rfc-muted">
            <Logo size={20} />© {new Date().getFullYear()} {footer.copyright}
          </span>
          <span className="rfc-cluster">
            {footer.socials.map((social) => {
              const Icon = socialIcon[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rfc-link"
                  title={social.label ?? social.platform}
                >
                  <Icon size={16} />
                </a>
              );
            })}
            <a
              href={`${config.repoUrl}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noreferrer"
              className="rfc-link rfc-fine"
            >
              Contribute
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
