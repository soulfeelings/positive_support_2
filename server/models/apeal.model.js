import mongoose from 'mongoose';

const Apeal = mongoose.model('Apeal', {
  text: { type: String, trim: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date_reg: {type: Date, default: Date.now}
});

export default Apeal;
