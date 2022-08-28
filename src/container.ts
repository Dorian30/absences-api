import { GetAbsencesController } from 'controllers';
import { AbsencesService } from 'services';
import { createContainer, InjectionMode, asClass } from 'awilix';

const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

container.register({
  absencesService: asClass(AbsencesService).singleton(),
  getAbsencesController: asClass(GetAbsencesController).singleton()
});

export default container;
