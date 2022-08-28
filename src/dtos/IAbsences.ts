import { IAbsence } from '../entities';

export interface IAbsencesDTO extends IAbsence {
  memberName: string;
}
