import mongoose from 'mongoose';

const User = mongoose.model('User', {
  name: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  photoURL: { type: String },
  isBan: { type: Boolean, default: false },
  chatId: { type: Number },
  secretId: {type: String},
  connected_circles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Circle' }],
});

export default User;
