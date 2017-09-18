import { IModel } from './model';

export interface IProduct extends IModel {
  name: string;
  description: string;
  price: number;
  specs: {[key: string]: string };
  img: string[];
}
