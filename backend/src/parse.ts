interface Line {
  date: string;
  severity: string;
  message: string;
}

export const parseLines = (content: string): Line[] => {
  const capturingRegex = /(?<date>20\d\d-\d\d-\d\d \d\d:\d\d:\d\d,\d\d\d) (?<severity>[A-Z]*) (?<message>.*)/;

  const rawLines = content.split('\n');

  const parsed = rawLines.map((line: string) => {
    line.trim();

    const found = line.match(capturingRegex);
    if (found === null) {
      throw new Error('Cannot parse line: ' + line);
    }
    return (found.groups as unknown) as Line;
  });
  return parsed;
};
