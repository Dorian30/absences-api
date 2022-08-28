import { createContainer, InjectionMode, asClass } from 'awilix';

import { AbsencesService } from './services';
import { GetAbsencesController } from './controllers';

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

container.register({
  absencesService: asClass(AbsencesService).singleton(),
  getAbsencesController: asClass(GetAbsencesController).singleton()
});

export default container;
