/** Copy and facts for the Portée product page, shared with its SEO metadata. */
export const PORTEE = {
  name: 'Portée',
  path: '/portee',
  version: '0.1.0',
  download: '/downloads/Portee-0.1.0.dmg',
  fileSize: '3.4 MB',
  requirements: 'macOS 12 or later · Apple Silicon',
  film: { src: '/videos/portee-launch.mp4', poster: '/videos/portee-launch.jpg' },
  title: 'Portée — Manage Claude Code, Codex & Cursor on your Mac',
  description:
    'See the disk and memory Claude Code, Codex, Cursor and OpenCode use, clean up safely, sync MCP servers and skills across agents, and search every past session. Free for macOS.',
};

export const PORTEE_FONTS =
  'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:wght@400;600&display=swap';

export const porteeFaq: { q: string; a: string }[] = [
  {
    q: 'Is Portée free?',
    a: 'Yes. Portée is a free download for macOS.',
  },
  {
    q: 'Which coding agents does Portée support?',
    a: 'Claude Code, Codex, Cursor and OpenCode. Portée detects which of them are installed on your Mac and where they keep their data.',
  },
  {
    q: 'How much disk space do Claude Code and other coding agents use?',
    a: 'It depends on how much you use them: sessions, caches and app data pile up over time, often into gigabytes. Portée shows the disk and memory each agent is using right now, so you can see the real number for your Mac.',
  },
  {
    q: 'Will Portée delete anything on its own?',
    a: 'No. The Storage view groups what can be cleaned up for each agent, and nothing is removed until you review it and choose what goes.',
  },
  {
    q: 'How do I use the same MCP servers and skills in every agent?',
    a: 'Add an MCP server, skill, tool or hook to Portée’s catalog once, then choose which agents to sync it to. Existing configs can be adopted into the catalog, and TOML files are edited in place so your comments and formatting survive.',
  },
  {
    q: 'Can I search my old Claude Code and Codex sessions?',
    a: 'Yes. Portée searches past sessions across all four agents by the words you remember, then opens the one you need so you can carry on instead of starting over.',
  },
  {
    q: 'Does session search send my data anywhere or use tokens?',
    a: 'No. Search runs on a local index on your Mac, so it costs no tokens and your sessions never leave your machine.',
  },
  {
    q: 'Why does macOS warn me the first time I open it?',
    a: 'Portée is not yet notarized by Apple. On first launch, right-click the app and choose Open; after that it opens normally.',
  },
];
