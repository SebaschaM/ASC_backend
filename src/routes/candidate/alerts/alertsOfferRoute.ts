import express from "express";

import {
  getAlertsOffer,
  updateAlertOffer,
  insertAlertOffer,
  deleteAlertOffer,
  getAlertOfferDataById
} from "../../../controllers/candidate/alerts/alertsOfferController";

const router = express.Router();

router.get("/get-alerts/:postulanteId", getAlertsOffer);
router.put("/update-alert", updateAlertOffer);
router.post("/create-alert", insertAlertOffer);
router.get("/get-alert/:alertId", getAlertOfferDataById);
router.delete("/delete-alert/:alertId", deleteAlertOffer);

export default router;
