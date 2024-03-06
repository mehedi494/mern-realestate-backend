import { config } from "../../../config/env.js";
import { jwtHelpers } from "../../../helper/jwt.js";
import ApiError from "../../middleware/ApiError.js";
import Listing from "./listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      statuCode: 200,
      message: "Created listing",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserListing = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    const user = jwtHelpers.decodeUser(token, config.JWT_SECRET);
    console.log("user id ",user.id , "params id", req.params.id);
    if (user.id === req.params.id) {
      try {
        const listing = await Listing.find({ userRef: user.id });
        // console.log(listing);
        res
          .status(200)
          .json({
            success: true,
            statusCode: 200,
            message: "successfull data fetch",
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
