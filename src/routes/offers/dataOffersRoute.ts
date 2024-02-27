import express from "express";
import { getOffersDataByLocation, getOffersDataByJob, getOffersDataByOfferArea, getOffersDataByJobAndLocation } from "../../controllers/candidate/offers/getOffersControllerData";

const router = express.Router();

router.get("/provinciaid/:location", getOffersDataByLocation);
router.get("/puesto/:job", getOffersDataByJob);
router.get("/area/:areaId", getOffersDataByOfferArea);  
router.get("/job/:job/provinciaid/:location", getOffersDataByJobAndLocation);

export default router;