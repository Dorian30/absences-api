import { Response, Request } from 'express';

import { AbsencesService } from '../../services/Absences';

export class GetAbsencesController {
  private absencesService: AbsencesService;

  constructor(readonly opts: { absencesService: AbsencesService }) {
    this.absencesService = opts.absencesService;
  }

  async executeImpl(req: Request, res: Response) {
    const { page, type, period } = req.query as any;
    const absences = await this.absencesService.findAbsences({
      page,
      type,
      period
    });

    return res.setHeader('X-Total-Count', absences.length).json(absences);
  }
}
