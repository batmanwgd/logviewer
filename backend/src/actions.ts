import { Response, Request } from 'express';
import { fetchUrls, insertUrl } from './db';
import { generateHash } from './code';
import { config } from './config';
import { isValidUrl } from './validate';

interface UrlEntry {
  code: string;
  url: string;
}

const recordToResponse = (record: UrlEntry) => ({
  ...record,
  code: config.XLINK_URL + record.code,
});

export const handleUrlListAction = async (res: Response<any>) => {
  const responseBody = (await fetchUrls()).map(recordToResponse);
  res.send(responseBody);
};

export const handleCreateUrlAction = async (
  req: Request<any>,
  res: Response<any>,
) => {
  if (!isValidUrl(req.body.url)) {
    res.status(400).send({
      error: 'URL is not valid',
    });
    return;
  }

  const newEntry = {
    code: generateHash(),
    url: req.body.url,
  };

  try {
    await insertUrl(newEntry);
  } catch (e) {
    if (e.code === 11000) {
      res.status(503).send({
        error: 'Wait until different code is generated and try again later',
      });
      return;
    }
    throw e;
  }

  const newEntryResponse = recordToResponse(newEntry);

  res.status(201).send(newEntryResponse);
};
