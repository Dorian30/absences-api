import path from 'path';

import { compose } from 'ramda';
import { areIntervalsOverlapping, format } from 'date-fns';

import { IMember } from '../../entities/IMembers';
import { IAbsence } from '../../entities/IAbsences';
import { filterBy, mapBy, readJsonFile, slice } from '../../utils';
import { IAbsencesDTO } from '../../dtos';
import { MembersService } from '../../services/Members';

const ABSENCES_PATH = path.join(__dirname, 'absences.json');

export class AbsencesService {
  public PAGE_LIMIT = 10;

  private filterByType(type: string | null) {
    return filterBy((absence: IAbsence) =>
      !type ? true : absence.type === type
    );
  }

  private filterByDateInterval = (
    period: { from: string | null; to: string | null } | null
  ) =>
    filterBy((absence: IAbsence) => {
      try {
        if (period?.from && period?.to) {
          return areIntervalsOverlapping(
            {
              start: new Date(absence.startDate),
              end: new Date(absence.endDate)
            },
            {
              start: new Date(period.from),
              end: new Date(period.to)
            }
          );
        } else {
          throw new Error('Invalid interval set');
        }
      } catch (e) {
        // Returns all entries when an invalid interval is set
        return true;
      }
    });

  private mapMembersToAbsences(members: Array<IMember>) {
    return mapBy<IAbsence, IAbsencesDTO>((absence: IAbsence) => {
      const startDate = new Date(absence.startDate);
      const endDate = new Date(absence.endDate);
      const period = `${format(startDate, 'dd/MM/yyyy')} - ${format(
        endDate,
        'dd/MM/yyyy'
      )}`;

      return {
        ...absence,
        memberName:
          members.find(member => member.userId === absence.userId)?.name || '',
        status: absence.rejectedAt
          ? 'Rejected'
          : absence.confirmedAt
          ? 'Confirmed'
          : 'Requested',
        period
      };
    });
  }

  async findAll() {
    const absences = (await readJsonFile(ABSENCES_PATH)) as Array<IAbsence>;
    return absences;
  }

  async findAbsences({
    page,
    type,
    from,
    to
  }: {
    page?: number;
    type: 'sickness' | 'vacation';
    from: string | null;
    to: string | null;
  }) {
    const absences = (await readJsonFile(ABSENCES_PATH)) as Array<IAbsence>;
    const members = await MembersService.findAll();

    const filteredAbsences = compose(
      this.mapMembersToAbsences(members),
      this.filterByDateInterval({ from, to }),
      this.filterByType(type)
    )(absences);

    // Return
    return {
      absences: page
        ? slice(
            this.PAGE_LIMIT * (page - 1),
            this.PAGE_LIMIT * page
          )(filteredAbsences)
        : filteredAbsences,
      totalRecords: filteredAbsences.length
    };
  }
}
