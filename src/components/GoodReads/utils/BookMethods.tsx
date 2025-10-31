export function appliedStyle(input: string | undefined) {
  if (input?.charAt(0) === '#') {
    return input;
  }

  const map: Record<string, string> = {
    green: '#00B600',
    blue: '#5d909c',
    umber: '#54290C',
    springer: '#F2E323',
    maroon: '#800000',
    pink: '#d6a470',
    cyan: '#025D57',
    purple: '#5F184E',
  };

  return input ? map[input] : '#00B600';
}
