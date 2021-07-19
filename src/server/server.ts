import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

import appPath from '../../utils/path';

import { readNumber, IDocument, replaceNumber } from './db';
import { serverRender } from './server-render-middleware';

const app = express();
const port = 3080;

app.use(bodyParser.json());

app.use(express.static(appPath.dist));
app.use(express.static(appPath.publicFolder));

app.get('/', serverRender);
app.get('/home', serverRender);
app.get('/contacts', serverRender);
app.get('/schedule', serverRender);

app.get('/api/data', (_req: Request, res: Response) => {
  readNumber()
    .then((data: IDocument) => {
      res.json(
        JSON.stringify({
          number: data?.number,
        })
      );
    })
    .catch(e => console.log(e));
});

app.post('/api/data', (req: Request, res: Response) => {
  const value = req.body.number;
  replaceNumber(value as number)
    .then(() => {
      res.json('Number setted');
    })
    .catch(e => console.log(e));
});

app.get('/api/homePage', async (_req: Request, res: Response) => {
  let data;
  try {
    data = await readNumber();
  } catch (e) {
    console.log(e);
  }

  res.json(
    JSON.stringify({
      data: {
        number: data?.number,
      },
    })
  );
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
