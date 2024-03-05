"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getLocations_1 = require("../../controllers/seed/getLocations");
const router = express_1.default.Router();
router.get("/all", getLocations_1.getLocationsGeo);
exports.default = router;
