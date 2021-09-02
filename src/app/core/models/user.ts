export class User {
  id?: string;
  name?: string;
  photoUrl?: string;
  phoneNumber?: number;
  email: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(obj: any = {}) {
    this.id = obj.id;
    this.name = obj.name;
    this.photoUrl = obj.photoUrl;
    this.phoneNumber = obj.phoneNumber;
    this.email = obj.email;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }
}
