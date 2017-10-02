import { express } from 'express';
import { User } from '../models/user';
import { jwt } from 'jsonwebtoken';

export const authRouter = express.Router();

// Log in returning user
authRouter.post('/login', (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        msg: 'An error occurred',
        err: err
      });
    }
    if (!user) {
      return res.status(401).json({
        msg: 'Login failed',
        err: {message: 'Invalid user credentials'}
      });
    }
    if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({
        msg: 'Login failed',
        err: {message: 'Invalid login credentials'}
      });
    }
    const token = jwt.sign({user: user.details}, '@matbufatUFA2012&2013!', {expiresIn: 7200});
    return res.status(200).json({
      msg: 'User logged in successfully',
      token: token,
      userId: user._id
    });
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
