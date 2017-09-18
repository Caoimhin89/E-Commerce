import { express } from 'express';
import {
  userRouter,
  authRouter,
  productRouter,
  offerRouter
} from './';

export const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/offer', offerRouter);