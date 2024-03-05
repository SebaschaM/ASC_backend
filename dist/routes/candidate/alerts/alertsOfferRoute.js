"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alertsOfferController_1 = require("../../../controllers/candidate/alerts/alertsOfferController");
const router = express_1.default.Router();
router.get("/get-alerts/:postulanteId", alertsOfferController_1.getAlertsOffer);
router.put("/update-alert", alertsOfferController_1.updateAlertOffer);
router.post("/create-alert", alertsOfferController_1.insertAlertOffer);
router.get("/get-alert/:alertId", alertsOfferController_1.getAlertOfferDataById);
exports.default = router;
