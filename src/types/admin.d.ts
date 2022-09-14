declare interface IAdminAttributes {
  Aid?: number;
  Admname: string;
  email: string;
  password: string;
  confirmpassword: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date; // for option attributtes ? used
}
