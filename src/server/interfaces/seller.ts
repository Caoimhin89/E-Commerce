import { IUser } from './user';
import { IProduct } from './product';

export interface ISeller extends IUser {
  depositAccount: object;
  inventory: {[key: string]: {product: IProduct, quantity: number } };
  rating: number;
  feedback: object[];

  addToInventory(productId: any, quantity: number);
  removeFromInventory(productId: any);
}
