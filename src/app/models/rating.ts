export class Rating {

  private id: number;
  private value: number;
  private description: string;
  private user: any;
  private date: Date;


  constructor(value: number, description: string, user: any, date: Date) {
    this.value = value;
    this.description = description;
    this.user = user;
    this.date = date;
  }
}
