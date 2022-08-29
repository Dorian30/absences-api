import { Response, Request } from 'express';

import { CalendarService } from '../../services';

export class GetCalendarController {
  private calendarService: CalendarService;

  constructor(
    readonly opts: {
      calendarService: CalendarService;
    }
  ) {
    this.calendarService = opts.calendarService;
  }

  async executeImpl(req: Request, res: Response) {
    const calendar = await this.calendarService.createCalendar(req);

    return res.json(calendar);
  }
}
