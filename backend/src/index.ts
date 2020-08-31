import express from 'express';
import cors from 'cors';
import { handleGet } from './actions';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  console.log('🗎 GET');
  try {
    handleGet(req, res);
  } catch (e) {
    console.error('Error hile handling GET /', e);
    res.status(500).send({ error: 'Unexpected error' });
  }
});

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`🗎 server running on http://localhost:${port}`);
});
