import mongoose from 'mongoose';

const Admin = mongoose.model('Admin', {
  name: { type: String, trim: true },
  password: { type: String, trim: true },
});

export default Admin;
