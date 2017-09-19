import { IModel } from './model';

export interface IProduct extends IModel {
  name: string;
  description: string;
  specs: {[key: string]: string };
  img: string[];
}
