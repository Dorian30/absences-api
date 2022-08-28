import { createContainer, InjectionMode, asClass } from 'awilix';

import { AbsencesService, CalendarService } from './services';
import { GetAbsencesController, GetCalendarController } from './controllers';

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

container.register({
  absencesService: asClass(AbsencesService).singleton(),
  getAbsencesController: asClass(GetAbsencesController).singleton(),
  calendarService: asClass(CalendarService).singleton(),
  getCalendarController: asClass(GetCalendarController).singleton()
});

export default container;
