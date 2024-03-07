import express from "express";
import multer from "multer";

import { uploadFileController } from "../../../controllers/candidate/files/fileActionsController";
import { deleteFile } from "../../../controllers/candidate/files/fileActionsController";

const upload = multer();

const app = express();

app.put("/upload-file", upload.single("file"), uploadFileController);
app.delete("/delete-file", deleteFile);

export default app;
