import { IAppUser } from '../app-interfaces';

export class AppUser implements IAppUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  addressBill: string;
  addressShip: string;
  twoStep: boolean;
  emailRecovery?: string;
  password?: string;
  id?: any;

  constructor(
    first: string,
    last: string,
    username: string,
    email: string,
    billing: string,
    shipping: string,
    twoStep: boolean,
    recoveryEmail?: string,
    password?: string,
    id?: any
  ) {

    this.firstName = first;
    this.lastName = last;
    this.userName = username;
    this.email = email;
    this.addressBill = billing;
    this.addressShip = shipping;
    this.twoStep = twoStep;
    this.emailRecovery = recoveryEmail;
    this.password = password;
    this.id = id;
  }
}
