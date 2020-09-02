import { Response, Request } from 'express';
import * as fs from 'fs';
import * as util from 'util';
import { parseLines } from './parse';

export const handleGet = async (req: Request<any>, res: Response<any>) => {
  const open = util.promisify(fs.open);
  const read = util.promisify(fs.read);

  const fd = await open('./data/example.log', 'r');
  const buffer = Buffer.alloc(16384);

  let lineContent = '';
  const start = parseInt(req.query.position as string) || 0;
  let position = start;
  for (;;) {
    const readResult = await read(fd, buffer, 0, buffer.length, position);

    const bufferContent = readResult.buffer.toString();
    const lastN = bufferContent.lastIndexOf('\n');
    if (lastN === -1) {
      lineContent = lineContent + bufferContent;
      position = position + bufferContent.length;
      continue;
    }
    lineContent = lineContent + bufferContent.slice(0, lastN);
    position = position + lastN;

    res.json({
      start,
      end: position,
      lines: parseLines(lineContent),
    });
    break;
  }
};
