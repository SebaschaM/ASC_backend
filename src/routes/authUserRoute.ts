import express from "express";

import {
  inCompleteRegisterCandidate,
  completeRegisterCandidate,
  inCompleteRegisterCompany,
  completeRegisterCompany,
  loginAuthCandidate,
  loginAuthCompany,
} from "../controllers/authController";

const router = express.Router();

//CANDIDATE ROUTES
router.post("/candidate/register-uncomplete", inCompleteRegisterCandidate);
router.post("/candidate/register-complete", completeRegisterCandidate);
router.post("/login/candidate", loginAuthCandidate);

//COMPANY ROUTES
router.post("/company/register-uncomplete", inCompleteRegisterCompany);
router.post("/company/register-complete", completeRegisterCompany);
router.post("/login/company", loginAuthCompany);

export default router;