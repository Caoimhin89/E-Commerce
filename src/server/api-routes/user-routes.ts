import { express } from 'express';
import { User } from '../models';

export const userRouter = express.Router();

// CREATE new user
userRouter.post('/register', (req, res) => {
  const newUser = new User();
  newUser.details.firstName = req.user.firstName;
  newUser.details.lastName = req.user.lastName;
  newUser.details.userName = req.user.userName;
  newUser.details.email = req.user.email;
  newUser.details.addressShip = req.user.addressShip;
  newUser.details.addressBill = req.user.addressBill;
  newUser.auth.emailRecovery = req.user.emailRecovery;
  newUser.auth.password = req.user.password;
  newUser.auth.secretKey2FA = req.user.twoStep;
  newUser.auth.lastLogin = req.user.lastLogin;
  newUser.auth.loginAttempts = req.user.loginAttempts;
  newUser.auth.acctLocked = req.user.acctLocked;

  newUser.save((err, result) => {
    if (err) {
      return res.status(500).json({
        msg: 'Failed to create user',
        err: err
      });
    }
    res.status(201).json({
      msg: 'New user created',
      obj: result
    });
  });
});

// RETRIEVE one user from the database
userRouter.get('/:id', (req, res) => {
  const user = User.findById(req.params.userId);
  return res.status(200).toJson(user);
});

// UPDATE an existing user
userRouter.put('/', (req, res) => {
  User.findByIdAndUpdate(req.body.userId, req.body.user, (err, updatedUser) => {
    if (err) {
      return res.status(500).json({
        msg: 'Failed to update user',
        err: err
      });
    }
    return res.status(200).toJson(updatedUser);
  });
});

// DELETE an existing user account
userRouter.delete('/', (req, res) => {
  User.findByIdAndRemove(req.body.userId, (err) => {
    if (err) {
      return res.status(500).json({
        msg: 'Failed to delete user',
        err: err
      });
    }
    return res.status(200).json({
      msg: 'User successfully deleted'
    });
  });
});


