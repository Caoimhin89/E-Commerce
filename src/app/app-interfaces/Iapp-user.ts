export interface IAppUser {
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
}

