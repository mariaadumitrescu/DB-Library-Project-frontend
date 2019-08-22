export class User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  token?: string;


  constructor(email: string, password: string, firstName: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
