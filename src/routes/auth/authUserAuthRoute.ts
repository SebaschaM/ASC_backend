import express from "express";

import {
  inCompleteRegisterCompany,
  completeRegisterCompany,
  loginAuthCompany,
} from "../../controllers/auth/company/authControllerCompany";

import {
  inCompleteRegisterCandidate,
  completeRegisterCandidate,
  loginAuthCandidate,
} from "../../controllers/auth/candidate/authControllerCandidate";

import {
  verifyEmailCode,
  verifyEmailCodeCompany,
} from "../../controllers/auth/email/authEmailVerification";

const router = express.Router();

//CANDIDATE ROUTES
router.post("/candidate/register-incomplete", inCompleteRegisterCandidate);
router.post("/candidate/register-complete", completeRegisterCandidate);
router.post("/login/candidate", loginAuthCandidate);

//COMPANY ROUTES
router.post("/company/register-incomplete", inCompleteRegisterCompany);
router.post("/company/register-complete", completeRegisterCompany);
router.post("/login/company", loginAuthCompany);

//VERIFICAR EMIAIL_CODE
router.post("/verify-email", verifyEmailCode);
router.post("/verify-email-company", verifyEmailCodeCompany);

export default router;
