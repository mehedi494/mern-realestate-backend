import express from "express";
import { createListing, deleteListing } from "./listing.controller.js";
import { verifieUser } from "../../utils/verifieUser.js";
const router = express.Router();

router.post("/", verifieUser, createListing);
router.delete("/delete/:id", verifieUser, deleteListing);

export const listingRoutes = router;
