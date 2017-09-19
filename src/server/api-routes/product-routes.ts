import { express } from 'express';
import { IProduct } from '../interfaces';
import { Product } from '../models';

export const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  const products = new Array<IProduct>();
  Product.find((err, data) => {
    if (err) {
      res.status(400).send({msg: 'Something went wrong', err: err});
    }
    data.forEach((product) => {
      products.push(product);
    });
  });
  res.status(200).toJson(products).send('Success');
});

productRouter.get('/:id', (req, res) => {
  const products = new Array<IProduct>();
  Product.find({sellerId: req.params.sellerId}, (err, data) => {
    if (err) {
      res.status(400).send({msg: 'Something went wrong', err: err});
    }
    data.forEach((product) => {
      products.push(product);
    });
  });
  res.status(200).toJson(products).send('Success');
});

productRouter.get('/categories', (req, res) => {
  const products = new Array<IProduct>();
  Product.find(req.query.categories, (err, data) => {
    if (err) {
      res.status(400).send({msg: 'Something went wrong.', err: err});
    }
    data.forEach((product) => {
      products.push(product);
    });
  });
  res.status(200).toJson(products).send('Success');
});

productRouter.post('/', (req, res) => {
  const product = new Product();
  product.description = req.product.description;
  product.specs = req.body.product.specs;
  product.name = req.body.product.name;
  product.img = req.body.product.img;
  product.save().catch((err) =>{
    res.status(400).send({msg: 'Something went wrong', err: err});
  });
  res.status(200).send('Success');
});
