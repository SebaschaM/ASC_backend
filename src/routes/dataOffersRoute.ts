import express from "express";
import { getOffersData } from "../controllers/getOffersData";

const router = express.Router();

router.get("/get-data-offers", getOffersData);

export default router;