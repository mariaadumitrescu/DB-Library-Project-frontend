import {Image} from './image';

export class FullUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  img: Image;
  penalties: any[];
  roles: any;
  enabled: boolean;
  admin: boolean;
  banned: boolean;
  banUntil: Date;
}
