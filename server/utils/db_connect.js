import mongoose from 'mongoose';

const dbConnectionAdress = process.env.DB;

export default async function dbConnect() {
  try {
    return await mongoose.connect(
      dbConnectionAdress,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      },
      () => {
        console.log('======== db connected');
      }
    );
  } catch (error) {
    console.log('DB connection error', error);
  }
}
