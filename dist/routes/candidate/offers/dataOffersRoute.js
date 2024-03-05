"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const offersControllerData_1 = require("../../../controllers/candidate/offers/offersControllerData");
const applyOfferController_1 = require("../../../controllers/candidate/offers/applyOfferController");
const router = express_1.default.Router();
// BUSCAR OFERTAS
router.get("/get-offer/provinciaid/:location", offersControllerData_1.getOffersDataByLocation);
router.get("/get-offer/puesto/:job", offersControllerData_1.getOffersDataByJob);
router.get("/get-offer/area/:areaId", offersControllerData_1.getOffersDataByOfferArea);
router.get("/get-offer/job/:job/provinciaid/:location", offersControllerData_1.getOffersDataByJobAndLocation);
//LISTAR AREAS CON MAS OFERTAS
router.get("/get-offer/areas-top", offersControllerData_1.getOfferAreasTop);
//APLICAR OFERTAS
router.post("/apply-offer", applyOfferController_1.applyOffer);
//OBTENER OFERTAS POR USUARIO
router.get("/get-offers/user/:postulanteId", applyOfferController_1.getOffersByUser);
exports.default = router;
