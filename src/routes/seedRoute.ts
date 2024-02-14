import express from "express";
import { insertDefaultData } from "../controllers/seedController";  

const router = express.Router();

router.get("/", insertDefaultData);

export default router;
