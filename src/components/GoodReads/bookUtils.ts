export const DEFAULT_SPINE_COLOR = '#f3a89f';

export function asHexColor(input?: string) {
  if (!input) return DEFAULT_SPINE_COLOR;
  if (input.startsWith('#')) return input;

  const palette: Record<string, string> = {
    peach: '#f3a89f',
    sky: '#6c92f0',
    linen: '#f5e6d8',
    grape: '#9980ff',
    mint: '#7bc7c3',
    coral: '#f6b6c4',
    cocoa: '#3f312c',
  };

  return palette[input] ?? DEFAULT_SPINE_COLOR;
}

export function ensureWidth(width?: number) {
  if (!width) return 40;
  if (width <= 150) return 15;
  return width / 10;
}
