import express from "express";
import { getOffersDataByLocation, getOffersDataByJob, getOffersDataByOfferArea, getOffersDataByJobAndLocation } from "../../../controllers/candidate/offers/offersControllerData";
import {applyOffer, getOffersByUser} from "../../../controllers/candidate/offers/applyOfferController";

const router = express.Router();

// BUSCAR OFERTAS
router.get("/get-offer/provinciaid/:location", getOffersDataByLocation);
router.get("/get-offer/puesto/:job", getOffersDataByJob);
router.get("/get-offer/area/:areaId", getOffersDataByOfferArea);  
router.get("/get-offer/job/:job/provinciaid/:location", getOffersDataByJobAndLocation);

//APLICAR OFERTAS
router.post("/apply-offer", applyOffer);

//OBTENER OFERTAS POR USUARIO
router.get("/get-offers/user/:postulanteId", getOffersByUser);


export default router;