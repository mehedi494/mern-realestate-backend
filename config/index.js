/*  Data base connected here */

import mongoose from "mongoose";
const database = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`✅ Database connected succefully`);
  } catch (error) {
    console.log(error);
  }
};
export default database;
