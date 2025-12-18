'use client';

import Link from 'next/link';
import { Logo } from './logo';
import config from '@/rfc.config';
import { Github, Twitter, MessageCircle, Send, Youtube, Linkedin, Globe } from 'lucide-react';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  discord: MessageCircle,
  telegram: Send,
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe,
};

export function DocsFooter() {
  const currentYear = new Date().getFullYear();
  const { footer, name, shortName } = config;

  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footer.sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials Column - if there are less than 4 sections */}
          {footer.sections.length < 4 && footer.socials.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm">Connect</h3>
              <ul className="space-y-2 text-sm">
                {footer.socials.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {social.label || social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Logo size={20} />
            <span className="text-sm text-muted-foreground">
              &copy; {currentYear} {footer.copyright}. Released under CC0.
            </span>
          </div>

          {/* Socials Icons (inline) + Contribute */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {footer.socials.map((social) => {
              const Icon = socialIcons[social.platform];
              return Icon ? (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                  title={social.label || social.platform}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : null;
            })}
            <span className="text-border">|</span>
            <a
              href={`${config.repoUrl}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Contribute
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
