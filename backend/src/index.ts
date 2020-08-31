import express from 'express';
import cors from 'cors';
import { handleUrlListAction, handleCreateUrlAction } from './actions';
import { createUniqueIndex } from './db';

createUniqueIndex().then(() => console.log('☝️ Unique index created'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (_, res) => {
  console.log('🔗 GET');
  try {
    handleUrlListAction(res);
  } catch (e) {
    console.error('Error hile handling GET /', e);
    res.status(500).send({ error: 'Unexpected error' });
  }
});

app.post('/', async (req, res) => {
  console.log('🔗 POST: ', req.body);
  try {
    handleCreateUrlAction(req, res);
  } catch (e) {
    console.error('Error hile handling POST /', e);
    res.status(500).send({ error: 'Unexpected error' });
  }
});

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`🔗 server running on http://localhost:${port}`);
});
