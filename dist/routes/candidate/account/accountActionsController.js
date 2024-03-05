"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const changePasswordController_1 = require("../../../controllers/candidate/account/changePasswordController");
const changeVisibleCVController_1 = require("../../../controllers/candidate/account/changeVisibleCVController");
const deactivateAccountController_1 = require("../../../controllers/candidate/account/deactivateAccountController");
const personalInfoContactController_1 = require("../../../controllers/candidate/cv/personalInfoContactController");
const personalInfoContactController_2 = require("../../../controllers/candidate/cv/personalInfoContactController");
const experienceInfoController_1 = require("../../../controllers/candidate/cv/experienceInfoController");
const experienceInfoController_2 = require("../../../controllers/candidate/cv/experienceInfoController");
const educationInfoController_1 = require("../../../controllers/candidate/cv/educationInfoController");
const educationInfoController_2 = require("../../../controllers/candidate/cv/educationInfoController");
const languageInfoController_1 = require("../../../controllers/candidate/cv/languageInfoController");
const languageInfoController_2 = require("../../../controllers/candidate/cv/languageInfoController");
const changeEmailController_1 = require("../../../controllers/candidate/account/changeEmailController");
const router = express_1.default.Router();
router.put("/candidate/change-password", changePasswordController_1.changePassword);
router.put("/candidate/change-email", changeEmailController_1.changeEmail);
router.put("/candidate/change-cv-visible", changeVisibleCVController_1.changeVisibleCV);
router.put("/candidate/deactivate-account", deactivateAccountController_1.deactivateAccount);
//PERSONAL INFO
router.get("/candidate/get-personal-info/:postulanteId", personalInfoContactController_1.getPersonalInfo);
router.put("/candidate/personal-info", personalInfoContactController_2.insertPersonalInfo);
//EXPERIENCIA INFO
router.get("/candidate/get-experience-info/:postulanteId", experienceInfoController_1.getExperienceInfo);
router.post("/candidate/experience-info", experienceInfoController_2.insertExperienceInfo);
//EDUCATION INFO
router.get("/candidate/get-education-info/:postulanteId", educationInfoController_1.getEducationInfo);
router.post("/candidate/education-info", educationInfoController_2.insertEducationInfo);
//LANGUAGE INFO
router.get("/candidate/get-language-info/:postulanteId", languageInfoController_1.getLanguageInfo);
router.post("/candidate/language-info", languageInfoController_2.insertLanguageInfo);
exports.default = router;
