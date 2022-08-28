import { GetAbsencesController } from 'controllers';
import express, { Request } from 'express';

import container from './container';

const app = express();
const port = process.env.PORT || 3000;

app.get('/absences', (req: Request<any>, res) =>
  container
    .resolve<GetAbsencesController>('getAbsencesController')
    .executeImpl(req, res)
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
