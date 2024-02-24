import express from "express";
import { getLocationsGeo } from "../controllers/seed/getLocations";

const router = express.Router();

router.get("/all", getLocationsGeo);

export default router;