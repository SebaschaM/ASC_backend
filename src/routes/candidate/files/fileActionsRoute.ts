import express from "express";
import multer from "multer";

import { uploadFileController } from "../../../controllers/candidate/files/fileActionsController";

const upload = multer();

const app = express();

app.post("/upload-file", upload.single("file"), uploadFileController);

export default app;
