import { config } from "./config";
import { Page } from "./page";

export const fetchLogPage = async (start: number) => {
  const response : Response = await fetch(`${config.BACKEND_URL}?position=${start}`);
  const page: Page = await response.json();
  return { ...page, lineCount: page.lines.length, stats: {}};
}