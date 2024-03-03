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
