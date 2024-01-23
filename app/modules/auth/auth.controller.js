import User from "../users/user.model.js";
import bcrypt from "bcryptjs"
export const sign_up = async (req, res,next) => {
  // eslint-disable-next-line no-console
 try {
  const { userName, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password,12)
  const newUser = new User({ userName, email, password:hashedPassword });
  await newUser.save();
  res.json({ status: true, code: 200, message: "User created succefully" });
 } catch (error) {
   next(error)
 }
};
