import { Response, Request } from 'express';

import { AbsencesService } from '../../services/Absences';

export class GetAbsencesController {
  private absencesService: AbsencesService;

  constructor(readonly opts: { absencesService: AbsencesService }) {
    this.absencesService = opts.absencesService;
  }

  async executeImpl(req: Request, res: Response) {
    const { page, type, from, to } = req.query as any;
    const { absences, totalRecords } = await this.absencesService.findAbsences({
      page,
      type,
      from,
      to
    });

    return res.setHeader('X-Total-Count', totalRecords).json(absences);
  }
}
