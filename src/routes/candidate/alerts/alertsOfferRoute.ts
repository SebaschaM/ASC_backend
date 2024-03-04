import express from "express";

import {
  getAlertsOffer,
  updateAlertOffer,
  insertAlertOffer,
  getAlertOfferDataById
} from "../../../controllers/candidate/alerts/alertsOfferController";

const router = express.Router();

router.get("/get-alerts/:postulanteId", getAlertsOffer);
router.put("/update-alert", updateAlertOffer);
router.post("/create-alert", insertAlertOffer);
router.get("/get-alert/:alertId", getAlertOfferDataById);

export default router;
