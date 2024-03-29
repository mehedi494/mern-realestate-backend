import bcrypt from "bcryptjs";
import { config } from "../../../config/env.js";
import { jwtHelpers } from "../../../helper/jwt.js";
import ApiError from "../../middleware/ApiError.js";
import User from "../users/user.model.js";

const cookieOptions = {
  expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const sign_up = async (req, res, next) => {
  // eslint-disable-next-line no-console
  try {
    const { userName, password, email } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new ApiError(400, "User already exist");
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    res.json({ status: true, code: 200, message: "User created succefully" });
  } catch (error) {
    next(error);
  }
};
export const sign_in = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // console.log({email});
    const user = await User.findOne({ email: email });

    if (!user) throw new ApiError(400, "User not found");
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new ApiError(401, "Wrong credentials!");

    const token = jwtHelpers.createToken(
      { id: user._id },
      config.JWT_SECRET,
      config.JWT_EXPIRES_IN // Pass expiresIn as an object
    );

    const userWithoutPassword = {
      ...user.toObject(),
      password: undefined,
    };

    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + 10 * 24 * 60 * 60 * 1000
    //   ),
    //   // httpOnly: true,
    // };

    res.cookie("access_token", token, cookieOptions);
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};
export const googleSignIn = async (req, res, next) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      const token = jwtHelpers.createToken(
        { id: existUser._id },
        config.JWT_SECRET,
        config.JWT_EXPIRES_IN
      );

      const userWithoutPassword = {
        ...existUser.toObject(),
        password: undefined,
      };
      /*  const cookieOptions = {
        httpOnly: true,
        path: "/",
      }; */
      res
        .cookie("access_token", token, cookieOptions)
        .status(200)
        .json(userWithoutPassword);
    } else {
      const generatedUserName =
        req.body.name.split(" ").join("-").toLowerCase() +
        Math.random().toString(36).slice(-5);
      const generatedPassword =
        Math.random(36).toString(36).slice(-8) +
        Math.random(36).toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 12);

      const newUser = new User({
        userName: generatedUserName,
        password: hashedPassword,
        email: req.body.email,
        avatar: req.body.img,
      });
      await newUser.save();
      const token = jwtHelpers.createToken(
        { id: newUser._id },
        config.JWT_SECRET,
        config.JWT_EXPIRES_IN
      );
      const userWithoutPassword = {
        ...newUser.toObject(),
        password: undefined,
      };
      /* const cookieOptions = {
        httpOnly: true,
        path: "/",
      }; */
      res.cookie("access_token", token).status(200).json(userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User has been loged out",
    });
  } catch (error) {
    next(error);
  }
};
