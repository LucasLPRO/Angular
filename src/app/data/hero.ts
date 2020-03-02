import {Serializable} from './serializable';
import {Weapon} from './weapon';

export class Hero extends Serializable  {
  id: string;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pv: number;
  weapon: Weapon;
}
