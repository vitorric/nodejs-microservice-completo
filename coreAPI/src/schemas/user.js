const { Schema } = require('mongoose'),
  { mongoDB } = require('../conn/index.js');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true
    },
    status: {
      type: Boolean,
      default: 1
    },
    delete: {
      type: Boolean,
      default: 0
    }
  }, {
    collection: 'User',
    timestamps: true
  }
);

exports.User = mongoDB.model('User', UserSchema);
