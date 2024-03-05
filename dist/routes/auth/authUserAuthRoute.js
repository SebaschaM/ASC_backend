"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllerCompany_1 = require("../../controllers/auth/company/authControllerCompany");
const authControllerCandidate_1 = require("../../controllers/auth/candidate/authControllerCandidate");
const authEmailVerification_1 = require("../../controllers/auth/email/authEmailVerification");
const router = express_1.default.Router();
//CANDIDATE ROUTES
router.post("/candidate/register-incomplete", authControllerCandidate_1.inCompleteRegisterCandidate);
router.post("/candidate/register-complete", authControllerCandidate_1.completeRegisterCandidate);
router.post("/login/candidate", authControllerCandidate_1.loginAuthCandidate);
//COMPANY ROUTES
router.post("/company/register-incomplete", authControllerCompany_1.inCompleteRegisterCompany);
router.post("/company/register-complete", authControllerCompany_1.completeRegisterCompany);
router.post("/login/company", authControllerCompany_1.loginAuthCompany);
//VERIFICAR EMIAIL_CODE
router.post("/verify-email", authEmailVerification_1.verifyEmailCode);
router.post("/verify-email-company", authEmailVerification_1.verifyEmailCodeCompany);
exports.default = router;
