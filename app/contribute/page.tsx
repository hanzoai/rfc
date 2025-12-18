import Link from 'next/link';
import { Logo, LogoStatic } from '../../components/logo';
import config from '@/rfc.config';
import {
  FileText,
  GitPullRequest,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Terminal,
  BookOpen,
  AlertCircle,
  Clock,
} from 'lucide-react';

const shortName = config.shortName;

export const metadata = {
  title: 'Contribute',
  description: `Learn how to submit and contribute to ${config.name}`,
};

export default function ContributePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="font-bold text-xl">{config.name}</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse {shortName}s
            </Link>
            <Link href="/contribute" className="text-foreground font-medium">
              Contribute
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Contributing to {config.name}</h1>
          <p className="text-xl text-muted-foreground">
            Help shape the future by submitting proposals,
            reviewing drafts, and participating in discussions.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Quick Start</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="size-5" />
                  Discuss Your Idea
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Before writing a formal proposal, discuss your idea on the forum to gather
                  feedback and gauge community interest. This helps refine your proposal before
                  investing time in a full write-up.
                </p>
                {config.forumUrl && (
                  <a
                    href={config.forumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    Visit Forum <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="size-5" />
                  Create Your Draft
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Fork the repository and use the interactive wizard or template to create
                  a properly formatted {shortName} with all required sections.
                </p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm border border-border">
                  <div className="text-muted-foreground mb-2"># Clone and create new {shortName}</div>
                  <div>git clone {config.repoUrl}</div>
                  <div>cd {config.repoUrl.split('/').pop()}</div>
                  <div>make new</div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <GitPullRequest className="size-5" />
                  Submit Pull Request
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Submit your draft as a PR. The PR number becomes your {shortName} number.
                  Rename your file accordingly and address editor feedback.
                </p>
                <div className="bg-background rounded-lg p-4 font-mono text-sm border border-border">
                  <div className="text-muted-foreground mb-2"># Validate and submit</div>
                  <div>make pre-pr</div>
                  <div>git add {config.rfcDir}/{config.filePrefix}draft.md</div>
                  <div>git commit -m &quot;{shortName}: Your proposal title&quot;</div>
                  <div>git push origin your-branch</div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 p-6 rounded-lg border border-border bg-card">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="size-5" />
                  Progress Through Stages
                </h3>
                <p className="text-muted-foreground text-sm">
                  Your {shortName} will progress through stages: Draft → Review → Last Call → Final.
                  Address feedback, build consensus, and watch your proposal become a standard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="py-16 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">{shortName} Structure</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border bg-background">
              <h3 className="font-semibold mb-2">Required Frontmatter</h3>
              <div className="bg-card rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`---
${shortName.toLowerCase()}: <number>
title: <descriptive title>
description: <one-line description>
author: <Name (@github-username)>
discussions-to: <URL to discussion>
status: Draft|Review|Last Call|Final|Withdrawn
type: Standards Track|Meta|Informational
category: Core|Networking|Interface
created: <YYYY-MM-DD>
---`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-background">
                <h3 className="font-semibold mb-2">Required Sections</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Abstract (~200 words)</li>
                  <li>• Motivation</li>
                  <li>• Specification</li>
                  <li>• Rationale</li>
                  <li>• Backwards Compatibility</li>
                  <li>• Security Considerations</li>
                  <li>• Copyright (CC0)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <h3 className="font-semibold mb-2">For Standards Track</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Test Cases (required)</li>
                  <li>• Reference Implementation (recommended)</li>
                  <li>• 2+ independent implementations for Final</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Flow */}
      <section className="py-16 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Status Progression</h2>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 font-medium">
              Draft
            </div>
            <ArrowRight className="size-5 text-muted-foreground" />
            <div className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 font-medium">
              Review
            </div>
            <ArrowRight className="size-5 text-muted-foreground" />
            <div className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-500 font-medium">
              Last Call (14 days)
            </div>
            <ArrowRight className="size-5 text-muted-foreground" />
            <div className="px-4 py-2 rounded-lg bg-green-500/10 text-green-500 font-medium">
              Final
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5 text-yellow-500" />
                <h3 className="font-semibold">Draft</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Initial stage for new proposals. Authors can make significant changes
                based on feedback. Not yet ready for implementation.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="size-5 text-blue-500" />
                <h3 className="font-semibold">Review</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Proposal is mature and seeking broader community feedback.
                Only minor changes expected at this stage.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="size-5 text-purple-500" />
                <h3 className="font-semibold">Last Call</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Final review period (14 days). Last chance to raise concerns
                before the proposal becomes Final.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="size-5 text-green-500" />
                <h3 className="font-semibold">Final</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Accepted standard. No further changes except errata corrections.
                Ready for implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Reference */}
      <section className="py-16 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Terminal className="size-6" />
            Useful Commands
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { cmd: 'make new', desc: `Create a new ${shortName} using interactive wizard` },
              { cmd: `make validate FILE=${config.rfcDir}/${config.filePrefix}N.md`, desc: `Validate a specific ${shortName}` },
              { cmd: 'make validate-all', desc: `Validate all ${shortName} files` },
              { cmd: 'make check-links', desc: 'Check all links in documents' },
              { cmd: 'make update-index', desc: 'Update the README index' },
              { cmd: 'make stats', desc: `Show ${shortName} statistics` },
              { cmd: 'make list', desc: `List all ${shortName}s with titles` },
              { cmd: 'make pre-pr', desc: 'Run all pre-PR checks' },
            ].map((item) => (
              <div key={item.cmd} className="p-3 rounded-lg border border-border bg-background">
                <code className="text-sm font-mono text-foreground">{item.cmd}</code>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-8">Resources</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <a
              href={config.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors group"
            >
              <GitPullRequest className="size-8 mb-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h3 className="font-semibold mb-2">GitHub Repository</h3>
              <p className="text-sm text-muted-foreground">
                View source, submit PRs, and track issues
              </p>
            </a>
            {config.forumUrl && (
              <a
                href={config.forumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors group"
              >
                <MessageSquare className="size-8 mb-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <h3 className="font-semibold mb-2">Discussion Forum</h3>
                <p className="text-sm text-muted-foreground">
                  Discuss proposals and gather community feedback
                </p>
              </a>
            )}
            {config.helpUrl && (
              <a
                href={config.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors group"
              >
                <BookOpen className="size-8 mb-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Learn more about the platform
                </p>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <LogoStatic size={20} />
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/docs" className="hover:text-foreground">
              Browse {shortName}s
            </Link>
            <a href={config.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
