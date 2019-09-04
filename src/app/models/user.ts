import {Penalty} from './penalty';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  penalties: Penalty[];
  token?: string;


  constructor(email: string, password: string, firstName: string, lastName: string, penalties: Penalty[]) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.penalties = penalties;
  }
}
