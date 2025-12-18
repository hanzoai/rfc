'use client';

import config from '@/rfc.config';

interface LogoProps {
  size?: number;
  className?: string;
}

// Generic logo component - customize for your project
export function Logo({ size = 24, className = '' }: LogoProps) {
  // Default RFC icon - replace with your custom logo
  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg bg-foreground text-background ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size * 0.6, height: size * 0.6 }}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    </div>
  );
}

export function LogoWithText({ size = 24 }: { size?: number }) {
  const shortName = config.shortName;
  const fullName = config.name;

  return (
    <div className="flex items-center gap-2 group logo-with-text">
      <Logo
        size={size}
        className="transition-transform duration-200 group-hover:scale-110"
      />
      <div className="relative h-6">
        <span className="font-bold text-lg inline-block transition-all duration-300 ease-out group-hover:opacity-0 group-hover:-translate-y-full">
          {shortName}s
        </span>
        <span className="font-bold text-lg absolute left-0 top-0 opacity-0 translate-y-full transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap">
          {fullName}
        </span>
      </div>
    </div>
  );
}

export function LogoStatic({ size = 24, text }: { size?: number; text?: string }) {
  const displayText = text || `${config.shortName}s`;

  return (
    <div className="flex items-center gap-2">
      <Logo size={size} />
      <span className="font-bold text-lg">{displayText}</span>
    </div>
  );
}
