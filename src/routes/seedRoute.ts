import express from "express";
import { insertDefaultData } from "../controllers/seed/seedController";

const router = express.Router();

router.get("/", insertDefaultData);

export default router;
