import { IProduct } from '../interfaces';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
  name: String,
  description: String,
  specs: [{key: String, value: String}],
  img: [String]
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
