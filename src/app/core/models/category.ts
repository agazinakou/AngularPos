import { Product } from "./product";

export class Category {
  id: string;
  name : string;
  products? : Product[]
  status : boolean;
  created_at : Date;
  updated_at : Date;

  constructor(obj: any = {}) {
    this.id = obj.id;
    this.name = obj.name;
    this.products = obj.products;
    this.status = obj.status;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }
}
