export interface Line {
  date: string;
  severity: string;
  message: string;
}

export interface Page {
  start: number,
  end: number,
  lines: Line[],
}

export interface Stats {
  [Key: string]: number;
}

export interface CountedPage extends Page {
  lineCount: number;
}
