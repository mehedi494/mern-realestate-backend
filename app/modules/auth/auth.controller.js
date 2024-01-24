import { jwtHelpers } from "../../../helper/jwt.js";
import ApiError from "../../middleware/ApiError.js";
import User from "../users/user.model.js";
import bcrypt from "bcryptjs";
import { config } from "../../../config/env.js";
export const sign_up = async (req, res, next) => {
  // eslint-disable-next-line no-console
  try {
    const { userName, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    res.json({ status: true, code: 200, message: "User created succefully" });
  } catch (error) {
    next(error);
  }
};
export const sign_in = async (req, res, next) => {
  // eslint-disable-next-line no-console

  try {
    const { password, email } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) throw new ApiError(400, "User not found");
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) throw new ApiError(401, "Wrong credentials!");

    const token = jwtHelpers.createToken(
      { id: validUser._id },
      config.JWT_SECRET,
      config.JWT_EXPIRES_IN
    );

    // eslint-disable-next-line no-unused-vars
    const userWithoutPassword = { ...validUser.toObject(), password: undefined };
    res
      .cookie("access_token", token, { http: true })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
