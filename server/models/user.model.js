import mongoose from 'mongoose';

const User = mongoose.model('User', {
  name: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  isBan: { type: Boolean, default: false },
  chatId: { type: Number },
  secretId: {type: String},
});

export default User;
