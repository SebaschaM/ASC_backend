import express from "express";
import { getPostulationsApply } from "../../../controllers/candidate/postulations/PostulationsApplyController";

const router = express.Router();

router.get("/candidate/get-postulations-apply/:postulanteId", getPostulationsApply);

export default router;
