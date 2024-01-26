import bcrypt from "bcryptjs";
import { config } from "../../../config/env.js";
import { jwtHelpers } from "../../../helper/jwt.js";
import ApiError from "../../middleware/ApiError.js";
import User from "./user.model.js";

export const update = async (req, res, next) => {
  try {
    // Token checking
 
    const token = req?.cookies?.access_token;
    if (!token) throw new ApiError(401, "unauthorized");
    const verifiedToken = jwtHelpers.verifyToken(token, config.JWT_SECRET);
    if (!verifiedToken) {
      throw new ApiError(402, "access unauthorized");
    }
    
    if (verifiedToken?.id !== req.params?.id) {
      throw new ApiError(403, "forbidden");
    }

    //  hashing password
    const password = req?.body?.password;
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 12);
      req.body.password = hashedPassword;
    }
    // update after token checking and hashed password
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );
    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
