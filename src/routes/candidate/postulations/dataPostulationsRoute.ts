import express from "express";
import {
  getPostulationsApply,
  savePostulationStateCandidate,
} from "../../../controllers/candidate/postulation/postulationsApplyController";

const router = express.Router();

router.get(
  "/candidate/get-postulations-apply/:postulanteId",
  getPostulationsApply
);

router.put(
  "/candidate/update-postulation-state",
  savePostulationStateCandidate
);

export default router;
