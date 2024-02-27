import express from "express";
import {changePassword} from "../../controllers/candidate/candidateActions/changePasswordController";

const router = express.Router();

router.post("/change-password", changePassword);

export default router;