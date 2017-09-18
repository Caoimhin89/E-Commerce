import { express } from 'express';
import { User } from '../models/user';

export const userRouter = express.Router();

// READ one user from the database
userRouter.get('/', (req, res, next) => {
  const user = User.findById(req.body.userId);
  res.status(200).toJson(user).send('Success');
  next();
});

// UPDATE an existing user
userRouter.put('/', (req, res, next) => {
  User.findByIdAndUpdate(req.body.userId, req.body.user, (err, updatedUser) => {
    if (err) {
      console.error('An error occurred updating the user', err);
      res.status(400).send({msg: 'Sorry, user could not be updated.'});
    }
    res.status(200).toJson(updatedUser).send('User updated successfully.');
  });
  next();
});

// DELETE an existing user account
userRouter.delete('/', (req, res, next) => {
  User.findByIdAndRemove(req.body.userId, (err) => {
    if (err) {
      console.error('An error occurred deleting the user', err);
      res.status(400).send('User could not be deleted');
    }
    res.status(200).send('User successfully deleted');
  });
  next();
});


