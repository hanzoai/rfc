import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  GitPullRequest,
  MessageSquare,
  Terminal,
} from 'lucide-react';
import { Button } from '@hanzo/ui/primitives/Button';
import { SiteHeader, SiteFooter } from '@/components/chrome';
import config from '@/rfc.config';

const gap = (value: string) => ({ '--gap': value }) as React.CSSProperties;
const shortName = config.shortName;
const filePrefix = config.filePrefix;

export const metadata = {
  title: 'Contribute',
  description: `How to submit and contribute to ${config.name}`,
};

const steps = [
  {
    icon: BookOpen,
    title: 'Read the existing proposals',
    body: `Check whether your idea is already covered. Duplicate proposals are closed, and a related ${shortName} is usually the better place to extend.`,
  },
  {
    icon: MessageSquare,
    title: 'Open a discussion',
    body: 'Float the idea before writing the specification. Early feedback is cheaper than a rewrite, and it establishes rough consensus.',
  },
  {
    icon: FileText,
    title: 'Draft the proposal',
    body: `Copy the template, fill in the frontmatter, and write the specification. Number it after the maintainers assign one.`,
  },
  {
    icon: GitPullRequest,
    title: 'Open a pull request',
    body: 'Submit the draft against the main branch. Review happens in the open, in the PR and the linked discussion.',
  },
];

const lifecycle = [
  { status: 'Draft', body: 'The proposal is written and under active revision. Anyone can open one.' },
  { status: 'Review', body: 'The author considers the specification complete and is asking for formal review.' },
  { status: 'Last Call', body: 'The final review window before acceptance. Objections must be raised now.' },
  { status: 'Final', body: 'Accepted and considered a standard. Changes require a new proposal.' },
  { status: 'Withdrawn', body: 'The author has retired the proposal.' },
  { status: 'Stagnant', body: 'Inactive for long enough that it no longer tracks reality.' },
];

const frontmatter = `---
${shortName.toLowerCase()}: <number>
title: <short, descriptive title>
description: <one sentence>
author: Your Name (@your-handle)
status: Draft
type: Standards Track
category: <category>
created: <YYYY-MM-DD>
---`;

export default function ContributePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="rfc-shell rfc-section rfc-stack" style={gap('1rem')}>
          <h1 className="rfc-title" style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 2.75rem)' }}>
            Contributing to {config.name}
          </h1>
          <p className="rfc-lead" style={{ maxWidth: '42rem' }}>
            Help shape the future by submitting proposals, reviewing drafts and participating in discussions.
          </p>
        </section>

        <section data-tinted>
          <div className="rfc-shell rfc-section rfc-stack" style={gap('2rem')}>
            <h2 className="rfc-heading">How a proposal gets written</h2>
            <div className="rfc-grid" data-cols="2">
              {steps.map((step, i) => (
                <div key={step.title} className="rfc-card">
                  <div className="rfc-cluster" style={gap('0.75rem')}>
                    <span className="rfc-tile" data-size="sm">
                      <step.icon size={16} />
                    </span>
                    <span className="rfc-mono rfc-small rfc-muted">Step {i + 1}</span>
                  </div>
                  <h3 className="rfc-subheading">{step.title}</h3>
                  <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rfc-shell rfc-section rfc-stack" style={gap('1.5rem')}>
          <h2 className="rfc-heading">The frontmatter</h2>
          <p className="rfc-muted" style={{ margin: 0, maxWidth: '42rem' }}>
            Every file lives at <code>{`${config.rfcDir.replace(/^\.\.\//, '')}/${filePrefix}0000.md`}</code> and
            opens with this block. The site reads it directly — the listing, filters and search all come from here.
          </p>
          <div className="rfc-prose">
            <pre>
              <code>{frontmatter}</code>
            </pre>
          </div>
          <div className="rfc-cluster">
            <Button variant="outline" asChild>
              <a href={`${config.repoUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">
                <Terminal size={16} />
                Contributing guide
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={config.discussionsUrl ?? `${config.repoUrl}/discussions`} target="_blank" rel="noreferrer">
                <ExternalLink size={16} />
                Discussions
              </a>
            </Button>
          </div>
        </section>

        <section data-tinted>
          <div className="rfc-shell rfc-section rfc-stack" style={gap('1.5rem')}>
            <div>
              <h2 className="rfc-heading">Lifecycle</h2>
              <p className="rfc-muted" style={{ margin: '0.25rem 0 0' }}>
                Where a proposal sits, and what that means for you.
              </p>
            </div>
            <div className="rfc-stack" style={gap('0.5rem')}>
              {lifecycle.map((stage) => (
                <div key={stage.status} className="rfc-row" style={{ alignItems: 'flex-start' }}>
                  <span className="rfc-badge" data-status={stage.status} style={{ width: '6rem', justifyContent: 'center' }}>
                    {stage.status}
                  </span>
                  <span className="rfc-small rfc-muted">{stage.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rfc-shell rfc-section rfc-grid" data-cols="3">
          <div className="rfc-card">
            <span className="rfc-tile" data-size="sm">
              <CheckCircle2 size={16} />
            </span>
            <h3 className="rfc-subheading">What makes a good proposal</h3>
            <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
              One idea, specified precisely enough that two independent implementations would interoperate. Motivation
              first, then the specification, then the rationale for the choices made.
            </p>
          </div>
          <div className="rfc-card">
            <span className="rfc-tile" data-size="sm">
              <AlertCircle size={16} />
            </span>
            <h3 className="rfc-subheading">What gets rejected</h3>
            <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
              Bundles of unrelated changes, proposals with no implementation path, and anything that duplicates an
              existing {shortName} without superseding it explicitly.
            </p>
          </div>
          <div className="rfc-card">
            <span className="rfc-tile" data-size="sm">
              <Clock size={16} />
            </span>
            <h3 className="rfc-subheading">How long it takes</h3>
            <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
              Review is asynchronous and driven by the people who will implement it. Keeping the discussion thread
              answered is the fastest way through.
            </p>
          </div>
        </section>

        <section className="rfc-shell" style={{ paddingBottom: '4rem' }}>
          <div className="rfc-cta rfc-stack" style={gap('1.5rem')}>
            <h2 className="rfc-heading">Ready to start?</h2>
            <p style={{ maxWidth: '36rem', margin: 0, opacity: 0.8 }}>
              Read what already exists, then open a discussion with your idea.
            </p>
            <div className="rfc-cluster">
              <Button asChild>
                <Link href="/docs">
                  Browse {shortName}s
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href={config.discussionsUrl ?? `${config.repoUrl}/discussions`} target="_blank" rel="noreferrer">
                  Open a discussion
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
