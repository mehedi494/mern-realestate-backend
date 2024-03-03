
import { config } from "../../config/env.js";
import { jwtHelpers } from "../../helper/jwt.js";
import ApiError from "../middleware/ApiError.js";

export const verifieUser = async (req, res, next) => {
  try {
   
    const token = req?.cookies?.access_token;
    if (!token) throw new ApiError(401, "unauthorized");
    const verifiedToken = jwtHelpers.verifyToken(token, config.JWT_SECRET);
    if (!verifiedToken) {
      throw new ApiError(402, "access unauthorized");
    }

    // if (verifiedToken?.id !== req.params?.id) {
    //   throw new ApiError(403, "forbidden");
    // }
    next();
  } catch (error) {
    next(error);
  }
};
