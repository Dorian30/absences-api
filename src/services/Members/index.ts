import path from 'path';

import { IMember } from '../../entities';
import { readJsonFile } from '../../utils';

const MEMBERS_PATH = path.join(__dirname, 'members.json');

export class MembersService {
  static async findAll() {
    const data = (await readJsonFile(MEMBERS_PATH)) as Array<IMember>;
    return data;
  }
}
