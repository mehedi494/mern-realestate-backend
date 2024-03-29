import bcrypt from "bcryptjs";
import { config } from "../../../config/env.js";
import { jwtHelpers } from "../../../helper/jwt.js";
import ApiError from "../../middleware/ApiError.js";
import User from "./user.model.js";
import Listing from "../listing/listing.model.js";

export const updateUser = async (req, res, next) => {
  try {
    // Token checking

    // const token = req?.cookies?.access_token;
    // if (!token) throw new ApiError(401, "unauthorized");
    // const verifiedToken = jwtHelpers.verifyToken(token, config.JWT_SECRET);
    // if (!verifiedToken) {
    //   throw new ApiError(402, "access unauthorized");
    // }

    // if (verifiedToken?.id !== req.params?.id) {
    //   throw new ApiError(403, "forbidden");
    // }

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
    // console.log(updateUser);
    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
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

    // console.log(req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    res.clearCookie("access_token");
    res.status(200).json({ success: true, statusCode: 200, message: user });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    const user = jwtHelpers.decodeUser(token, config.JWT_SECRET);

    if (user.id === req.params.id) {
      try {
        const listing = await Listing.find({ userRef: user.id });

        res.status(200).json({
          success: true,
          statusCode: 200,
          message: "successfully data fetch",
          data: listing,
        });
      } catch (error) {
        next(error);
      }
    } else {
      return next(new ApiError(401, "you can only view your own listings"));
    }
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ApiError(404, "User not found!"));

    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully data fetch",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};
