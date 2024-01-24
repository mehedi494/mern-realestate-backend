/* eslint-disable no-console */
/* eslint-disable no-undef */
/*  Data base connected here */

import mongoose from "mongoose";
import { config } from "./env.js";
const database = async () => {
  try {
    await mongoose.connect(config.DB_URL);
    console.log(`✅ Database connected successfully`);
  } catch (error) {
    console.log(error);
  }
};
export default database;
