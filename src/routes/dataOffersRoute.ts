import express from "express";
import { getOffersData } from "../controllers/candidate/getOffersData";

const router = express.Router();

router.get("/all", getOffersData);

export default router;