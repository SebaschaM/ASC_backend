import express from "express";
import { changePassword } from "../../../controllers/candidate/account/changePasswordController";
import { changeVisibleCV } from "../../../controllers/candidate/account/changeVisibleCVController";
import { deactivateAccount } from "../../../controllers/candidate/account/deactivateAccountController";
import { getPersonalInfo } from "../../../controllers/candidate/cv/personalInfoContactController";
import { updatePersonalInfo } from "../../../controllers/candidate/cv/personalInfoContactController";
import {getExperienceInfo} from "../../../controllers/candidate/cv/experienceInfoController";
import {insertExperienceInfo} from "../../../controllers/candidate/cv/experienceInfoController";
import {getEducationInfo} from "../../../controllers/candidate/cv/educationInfoController";
import {insertEducationInfo} from "../../../controllers/candidate/cv/educationInfoController";
import {getLanguageInfo} from "../../../controllers/candidate/cv/languageInfoController";
import {insertLanguageInfo} from "../../../controllers/candidate/cv/languageInfoController";
import {changeEmail} from "../../../controllers/candidate/account/changeEmailController";
import {getIncompletePersonalInfo} from "../../../controllers/candidate/cv/personalInfoContactController";
import {updateIncompletePersonalInfo} from "../../../controllers/candidate/cv/personalInfoContactController";

const router = express.Router();

router.put("/candidate/change-password", changePassword);
router.put("/candidate/change-email", changeEmail);
router.put("/candidate/change-cv-visible", changeVisibleCV);
router.put("/candidate/deactivate-account", deactivateAccount);

//PERSONAL INFO
router.get("/candidate/get-personal-info/:postulanteId", getPersonalInfo);
router.put("/candidate/update-personal-info", updatePersonalInfo);
router.get("/candidate/get-incomplete-personal-info/:postulanteId", getIncompletePersonalInfo);
router.put("/candidate/update-incomplete-personal-info", updateIncompletePersonalInfo);

//EXPERIENCIA INFO
router.get("/candidate/get-experience-info/:postulanteId", getExperienceInfo);
router.post("/candidate/experience-info", insertExperienceInfo);

//EDUCATION INFO
router.get("/candidate/get-education-info/:postulanteId", getEducationInfo);
router.post("/candidate/education-info", insertEducationInfo);

//LANGUAGE INFO
router.get("/candidate/get-language-info/:postulanteId", getLanguageInfo);
router.post("/candidate/language-info", insertLanguageInfo);


export default router;
