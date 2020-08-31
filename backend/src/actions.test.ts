import { handleUrlListAction, handleCreateUrlAction } from './actions';
import { Response, Request } from 'express';
import { MongoError } from 'mongodb';

import { fetchUrls, insertUrl } from './db';
jest.mock('./db');

import { isValidUrl } from './validate';
jest.mock('./validate');

import { generateHash } from './code';
jest.mock('./code');

import { config } from './config';
jest.mock('./config');

describe('actions', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('handle URL list action', () => {
    config.XLINK_URL = 'https://pbid.io/';

    it('responds with what comes from database', async () => {
      const fetchUrlsMock = fetchUrls as jest.Mock;
      fetchUrlsMock.mockResolvedValue([
        { code: 'abc123', url: 'https://luke10x.dev/' },
      ]);
      const res: Partial<Response<any>> = {};
      res.send = jest.fn().mockReturnValue(res);

      (isValidUrl as jest.Mock).mockReturnValue(true);

      await handleUrlListAction(res as Response<any>);

      expect(res.send).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ code: 'https://pbid.io/abc123' }),
        ]),
      );
    });
  });

  describe('Handle create URL action', () => {
    config.XLINK_URL = 'https://pbid.io/';

    describe('success', () => {
      const req = {
        body: { url: 'https://luke10x.dev' },
      };

      const res: Partial<Response<any>> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      const generateHashMock = generateHash as jest.Mock;
      generateHashMock.mockReturnValue('g3n3r4t3');

      (isValidUrl as jest.Mock).mockReturnValue(true);

      it('saves passed URL with generated hash', async () => {
        const insertUrlMock = insertUrl as jest.Mock;

        await handleCreateUrlAction(req as Request<any>, res as Response<any>);

        expect(insertUrlMock).toHaveBeenCalledWith({
          url: 'https://luke10x.dev',
          code: 'g3n3r4t3',
        });
      });

      it('responds with created URL details', async () => {
        await handleCreateUrlAction(req as Request<any>, res as Response<any>);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
          url: 'https://luke10x.dev',
          code: 'https://pbid.io/g3n3r4t3',
        });
      });
    });

    describe('database errors when creating a new post', () => {
      const req = {
        body: { url: 'https://luke10x.dev' },
      };

      const res: Partial<Response<any>> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      const generateHashMock = generateHash as jest.Mock;
      generateHashMock.mockReturnValue('g3n3r4t3');

      (isValidUrl as jest.Mock).mockReturnValue(true);

      it('handles generic database errors', async () => {
        const insertUrlMock = insertUrl as jest.Mock;
        insertUrlMock.mockRejectedValue(new Error('Database corruption'));

        let error;
        try {
          await handleCreateUrlAction(
            req as Request<any>,
            res as Response<any>,
          );
        } catch (e) {
          error = e;
        }
        expect(error).toEqual(new Error('Database corruption'));
      });

      it('handles unique key violation', async () => {
        const insertUrlMock = insertUrl as jest.Mock;
        insertUrlMock.mockRejectedValue(new MongoError({ code: 11000 }));

        await handleCreateUrlAction(req as Request<any>, res as Response<any>);

        expect(res.status).toHaveBeenCalledWith(503);
        expect(res.send).toHaveBeenCalledWith({
          error: expect.stringContaining('try again later'),
        });
      });
    });

    describe('validation errors when creating a new post', () => {
      const req = {
        body: { url: 'microwave://luke10x.dev' },
      };

      const res: Partial<Response<any>> = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);

      const generateHashMock = generateHash as jest.Mock;
      generateHashMock.mockReturnValue('g3n3r4t3');

      const insertUrlMock = insertUrl as jest.Mock;

      it('handles invalid URL', async () => {
        (isValidUrl as jest.Mock).mockReturnValue(false);

        await handleCreateUrlAction(req as Request<any>, res as Response<any>);

        expect(insertUrlMock).not.toBeCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          error: expect.stringContaining('URL is not valid'),
        });
      });
    });
  });
});
