import express from "express";
import {changePassword} from "../../../controllers/candidate/accountActions/changePasswordController";
import {changeVisibleCV} from "../../../controllers/candidate/accountActions/changeVisibleCVController";
import {deactivateAccount} from "../../../controllers/candidate/accountActions/deactivateAccountController";

const router = express.Router();

router.put("/candidate/change-password", changePassword);
router.put("/candidate/change-email", changePassword); // aun no está hecho
router.put("/candidate/change-cv-visible", changeVisibleCV); // aun no está hecho
router.put("/candidate/deactivate-account", deactivateAccount); // aun no está hecho

export default router;