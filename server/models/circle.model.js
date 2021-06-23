import mongoose from 'mongoose';

const Circle = mongoose.model('Circle', {
  name: { type: String, trim: true, unique: true },
  img: {type: String},
  connected_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

export default Circle;
