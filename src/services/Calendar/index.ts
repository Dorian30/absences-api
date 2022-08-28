import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { compose } from 'ramda';
import { AbsencesService } from 'services/Absences';

import { mapBy, toICalDate } from '../../utils';
import { IAbsencesDTO } from '../../dtos';

export class CalendarService {
  private absencesService: AbsencesService;

  constructor(readonly opts: { absencesService: AbsencesService }) {
    this.absencesService = opts.absencesService;
  }

  private createICalEvents() {
    return mapBy<IAbsencesDTO, string>(absence =>
      [
        `BEGIN:VEVENT`,
        `UID:${uuidv4()}`,
        `DTSTAMP:${toICalDate(new Date())}`,
        `DTSTART:${toICalDate(new Date(absence.startDate))}`,
        `DTEND:${toICalDate(new Date(absence.endDate))}`,
        `SUMMARY: ${absence.type} - ${absence.memberName}`,
        `DESCRIPTION:${absence.memberNote}`,
        'END:VEVENT'
      ].join('\n')
    );
  }

  private createICal(events: Array<string>) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:crewmeister/ics',
      ...events,
      'END:VCALENDAR'
    ].join('\n');
  }

  async createCalendar(req: Request<any>) {
    const absences = await this.absencesService.findAbsences(req.params);

    const iCal = compose(this.createICal, this.createICalEvents())(absences);
    return iCal;
  }
}
