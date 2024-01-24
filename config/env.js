import dotenv from 'dotenv';
import process from "process";
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') })
export const config = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.EXPIRE_IN,
};
