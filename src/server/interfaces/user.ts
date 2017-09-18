import { IModel } from './model';

export interface IUser extends IModel {
  details: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    addressBill: string;
    addressShip: string;
    isEnabled2FA: boolean;
  };
  auth: {
    emailRecovery: string;
    password: string;
    secretKey2FA: object;
    lastLogin: Date;
    loginAttempts: number;
    acctLocked: boolean;
  };

  verifyAccount(): boolean;
  comparePassword(clearPassword: string): boolean;
  generateQRCode(): string;
  authenticateUser(userToken: string);
  unlockAccount(): void;
}
