import {
  BarChart3,
  Blocks,
  Bot,
  Brain,
  CheckSquare,
  Code2,
  Coins,
  Cpu,
  Eye,
  FlaskConical,
  Layers,
  Lock,
  Network,
  Plug,
  Rocket,
  Search,
  type LucideIcon,
} from 'lucide-react';

/**
 * `rfc.config.ts` names a category's icon as a string; this is the one place
 * those names bind to glyphs. Unknown names fall back to `layers` so a config
 * typo degrades instead of crashing the build.
 */
const icons: Record<string, LucideIcon> = {
  blocks: Blocks,
  bot: Bot,
  brain: Brain,
  chart: BarChart3,
  code: Code2,
  consensus: Cpu,
  eye: Eye,
  flask: FlaskConical,
  layers: Layers,
  lock: Lock,
  network: Network,
  plug: Plug,
  research: Search,
  token: Coins,
  upgrade: Rocket,
  vote: CheckSquare,
};

export function CategoryIcon({ name, size = 24 }: { name: string; size?: number }) {
  const Icon = icons[name] ?? Layers;
  return <Icon size={size} />;
}
