"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postulationsApplyController_1 = require("../../../controllers/candidate/postulations/postulationsApplyController");
const router = express_1.default.Router();
router.get("/candidate/get-postulations-apply/:postulanteId", postulationsApplyController_1.getPostulationsApply);
router.put("/candidate/update-postulation-state", postulationsApplyController_1.savePostulationStateCandidate);
exports.default = router;
