"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fileActionsController_1 = require("../../../controllers/candidate/files/fileActionsController");
const upload = (0, multer_1.default)();
const app = (0, express_1.default)();
app.put("/upload-file", upload.single("file"), fileActionsController_1.uploadFileController);
exports.default = app;
