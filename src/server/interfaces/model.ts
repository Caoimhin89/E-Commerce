import { Document } from 'mongoose';

export interface IModel extends Document {
  _id: any;
}