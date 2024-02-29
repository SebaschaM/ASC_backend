import express from "express";
import { changePassword } from "../../../controllers/candidate/accountActions/changePasswordController";
import { changeVisibleCV } from "../../../controllers/candidate/accountActions/changeVisibleCVController";
import { deactivateAccount } from "../../../controllers/candidate/accountActions/deactivateAccountController";
import { getPersonalInfo } from "../../../controllers/candidate/accountActions/personalInfoContactController";

const router = express.Router();

router.put("/candidate/change-password", changePassword);
router.put("/candidate/change-email", changePassword);
router.put("/candidate/change-cv-visible", changeVisibleCV);
router.put("/candidate/deactivate-account", deactivateAccount);
router.get("/candidate/get-personal-info/:postulanteId", getPersonalInfo);

export default router;
