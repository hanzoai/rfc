import config from '@/rfc.config';

/**
 * The mark. A generic document glyph by default — fork this file to brand a
 * site; nothing else in the app knows what the logo looks like.
 */
export function Logo({ size = 24 }: { size?: number }) {
  return (
    <span className="rfc-logo" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size * 0.6, height: size * 0.6 }}
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    </span>
  );
}

/**
 * Mark plus wordmark. The short name rides up on hover and the full name takes
 * its place — the swap is two layers in one grid cell, done in CSS.
 */
export function Lockup({ size = 24 }: { size?: number }) {
  return (
    <span className="rfc-lockup">
      <Logo size={size} />
      <span className="rfc-swap">
        <span>{config.shortName}s</span>
        <span>{config.name}</span>
      </span>
    </span>
  );
}
