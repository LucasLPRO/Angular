import {Serializable} from './serializable';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pv: number;
  weaponId: string;
}
