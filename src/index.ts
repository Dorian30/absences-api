import express, { Request } from 'express';
import cors from 'cors';

import { GetAbsencesController, GetCalendarController } from './controllers';
import container from './container';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ exposedHeaders: ['X-Total-Count'] }));

app.get('/absences', (req: Request<any>, res) =>
  container
    .resolve<GetAbsencesController>('getAbsencesController')
    .executeImpl(req, res)
);

app.get('/calendar', (req: Request<any>, res) =>
  container
    .resolve<GetCalendarController>('getCalendarController')
    .executeImpl(req, res)
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
