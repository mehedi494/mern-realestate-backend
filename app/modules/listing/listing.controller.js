import Listing from "./listing.model.js";
import ApiError from "../../middleware/ApiError.js";
import { jwtHelpers } from "../../../helper/jwt.js";
import { config } from "../../../config/env.js";

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
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ApiError(404, "Listing not found"));
    }

    const token = req?.cookies?.access_token;
    const user = jwtHelpers.decodeUser(token, config.JWT_SECRET);

    if (user.id !== listing.userRef) {
      return next(new ApiError(403, "Forbidden"));
    }
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      success: true,
      statuCode: 200,
      message: "delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ApiError(404, "Listing not found"));
    }

    const token = req?.cookies?.access_token;
    const user = jwtHelpers.decodeUser(token, config.JWT_SECRET);

    if (user.id !== listing.userRef) {
      return next(new ApiError(403, "Forbidden"));
    }

    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(201).json({
      success: true,
      statuCode: 200,
      message: "updated  listing",
      data: updateListing,
    });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ApiError(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getAllListing = async (req, res, next) => {
  try {

    if(!req.params.id){
      throw new ApiError(404, "request id not specified")
    }
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(new ApiError(404, "Listing not found"));
    }

    // const token = req?.cookies?.access_token;
    // const user = jwtHelpers.decodeUser(token, config.JWT_SECRET);

    // if (user.id !== listing.userRef) {
    //   return next(new ApiError(403, "Forbidden"));
    // }

    const singleListing = await Listing.findById(req.params.id);

    return res.status(201).json({
      success: true,
      statuCode: 200,
      message: "Fetch successfully ",
      data: singleListing,
    });
  } catch (error) {
    next(error);
  }
};
