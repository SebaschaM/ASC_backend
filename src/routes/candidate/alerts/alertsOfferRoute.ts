import express from "express";

import {
  getAlertsOffer,
  updateAlertOffer,
  insertAlertOffer
} from "../../../controllers/candidate/alerts/alertsOfferController";

const router = express.Router();

router.get("/get-alerts/:postulanteId", getAlertsOffer);
router.put("/update-alert", updateAlertOffer);
router.post("/insert-alert", insertAlertOffer);

export default router;
