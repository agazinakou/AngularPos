export class Product {
    id : string;
    name : string;
    price : number;
    stock : number;
    quantity? : number;
    category : any;
    status : boolean;
    updated_at : Date;
    created_at : Date;

    constructor(obj: any = {}) {
      this.id = obj.id;
      this.name = obj.name;
      this.price = obj.price;
      this.stock = obj.stock;
      this.quantity = obj.quantity;
      this.category = obj.category;
      this.status = obj.status;
      this.updated_at = obj.updated_at;
      this.created_at = obj.dcreated_atata;
    }
}
