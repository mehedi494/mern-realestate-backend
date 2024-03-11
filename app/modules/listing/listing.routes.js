import express from "express";
import { createListing, deleteListing, getAllListing,  getListing,  updateListing } from "./listing.controller.js";
import { verifieUser } from "../../utils/verifieUser.js";
const router = express.Router();

router.post("/", verifieUser, createListing);
router.delete("/delete/:id", verifieUser, deleteListing);
router.post("/update/:id", verifieUser, updateListing);

// getsing listing
router.get('/get/:id', getListing);
// getListing for all users
router.get("/:id",  getAllListing);

export const listingRoutes = router;
