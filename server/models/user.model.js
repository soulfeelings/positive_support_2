import mongoose from 'mongoose';

const User = mongoose.model('User', {
  name: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  photo_url: { type: String },
  isBan: { type: Boolean, default: false },
  chatId: { type: Number },
  secretId: {type: String},
  connected_circles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Circle' }],
  admin: { type: Boolean, default: false },
  situation: {type: String, trim: true},
});

export default User;
