export class Sale {
  id: string;
  name : string;
  status : boolean;
  created_at : Date;
  updated_at : Date;

  constructor(obj: any = {}) {
    this.id = obj.id;
    this.name = obj.name;
    this.status = obj.status;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }
}
