import { IUser } from '../interfaces/user';
import { speakeasy, qrcode } from 'speakeasy';
import { bcrypt } from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  details: {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    addressBill: String,
    addressShip: String,
    isEnabled2FA: Boolean
  },
  auth: {
    emailRecovery: String,
    password: String,
    secretKey2FA: Object,
    lastLogin: Date,
    loginAttempts: Number,
    acctLocked: Boolean
  }
});

// Checks to see if the account is locked
UserSchema.methods.verifyAccount = function() {
  const user = this;
  return user.auth.acctLocked;
};

// Checks provided password against password in the database
UserSchema.methods.comparePassword = function(clearPassword: string) {
  const user = this;
  bcrypt.compare(clearPassword, user.auth.password, (err, isMatch) => {
    if (err) {
      return err;
    }
    if (!isMatch) {
      user.auth.loginAttempts < 5 ? user.auth.loginAttempts++ : user.auth.acctLocked = true;
    }
    return isMatch;
  });
};

// Returns a QRCode for 2-Factor Authentication
UserSchema.methods.generateQRCode = function() {
  const user = this;
  const qrCode = qrcode.toDataURL(user.auth.secretKey2FA.otpauth_url, function(err, imgData) {
    if (err) {
      return err;
    }
    return imgData;
  });
  return qrCode;
};

// Checks that user's token is a match with the secret key
UserSchema.methods.authenticateUser = function(userToken: string) {
  const user = this;
  const verified = speakeasy.totp.verify({
    secret: user.auth.SecretKey2FA,
    encoding: 'base32',
    token: userToken
  });
  return verified;
};

// Unlocks the user's account
UserSchema.methods.unlockAccount = function() {
  const user = this;
  user.auth.acctLocked = false;
};

// Generates a secret key for 2-Factor Auth and hashes the password before saving new user to database
UserSchema.pre('save', function(next: Function) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.auth.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.auth.password = hash;
      return next();
    });
  });
  const secretKey = speakeasy.generateSecret({length: 20});
  user.auth.secretKey2FA = secretKey;
});

export const User = mongoose.model<IUser>('User', UserSchema);
