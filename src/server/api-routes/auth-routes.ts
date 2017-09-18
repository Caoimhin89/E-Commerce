import { express } from 'express';
import { User } from '../models/user';

export const authRouter = express.Router();

// Log in returning user
authRouter.post('/login', (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (err) {
      res.status(404).send({msg: 'Account not found.'});
    }
    const currentUser = new User(user);
    const isMatch = currentUser.comparePassword(req.body.password);
    if (!isMatch) {
      res.status(401).send({msg: 'Invalid password.'});
    }
    res.status(200).toJson(currentUser).send('Login succeeded.');
  });
});

// Send QR-Code for Two-Factor Authentication
authRouter.get('/2FA', (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (err) {
      res.status(404).send({msg: 'User not found'});
    }
    const qrCode = user.generateQRCode();
    res.status(200).toJson(qrCode).send('QR-Code successfully retrieved');
  });
});

// Verify user-token for Two-Factor Authentication
authRouter.post('/2FA', (req, res) => {
  let isVerified = false;
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (err) {
      res.status(404).send({msg: 'User not found'});
    }
    isVerified = user.authenticateUser(req.body.userToken);
  });
  res.status(200).send(isVerified);
});

// Register new user
authRouter.post('/register', (req, res) => {
  const newUser = new User();
  newUser.firstName = req.user.firstName;
  newUser.lastName = req.user.lastName;
  newUser.userName = req.user.userName;
  newUser.email = req.user.email;
  newUser.emailRecovery = req.user.emailRecovery;
  newUser.password = req.user.password;
  newUser.twoStep = req.user.twoStep;
  newUser.addressShip = req.user.addressShip;
  newUser.addressBill = req.user.addressBill;
  newUser.lastLogin = req.user.lastLogin;
  newUser.loginAttempts = req.user.loginAttempts;
  newUser.acctLocked = req.user.acctLocked;

  newUser.save((err) => {
    if (err) {
      console.error('An error has occurred saving the user to the database', err);
      res.status(400).send({msg: 'Sorry, failed to create user.'});
    }
    res.status(200).send('User saved successfully.');
  });
});
