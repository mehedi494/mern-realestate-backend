import Listing from "./listing.model.js";
import ApiError from "../../middleware/ApiError.js";
import { jwtHelpers } from "../../../helper/jwt.js";
import { config } from "../../../config/env.js";

export const createListing = async (req, res, next) => {
  try {
    // console.log(req.body);
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
      return next(new ApiError(404, "Listing not found!"));
    }

    res.status(200).json({ success: true, statusCode: 200, data: listing });
  } catch (error) {
    next(error);
  }
};

export const getAllListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(201).json({
      success: true,
      statuCode: 200,
      message: "Fetch successfully ",
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};
