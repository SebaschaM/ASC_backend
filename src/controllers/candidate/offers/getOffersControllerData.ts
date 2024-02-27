import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getOffersDataByLocation = async (req: Request, res: Response) => {
  const { location } = req.params;

  try {
    const db = await dbConnect(); // Invoke the dbConnect function to get the Client object
    const query = `SELECT * FROM oferta WHERE PROVINCIA_ID = $1`;
    const offers = await db?.query(query, [location]);

    res.status(200).json({
      ok: true,
      status: 200,
      data: offers?.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getOffersDataByJob = async (req: Request, res: Response) => {
  const { job } = req.params;

  try {
    const db = await dbConnect();
    const query = `SELECT * FROM oferta WHERE nombre_puesto ILIKE $1`;
    const offers = await db?.query(query, [`%${job}%`]);

    res.status(200).json({
      ok: true,
      status: 200,
      data: offers?.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getOffersDataByOfferArea = async (req: Request, res: Response) => {
  const { areaId } = req.params;

  try {
    const db = await dbConnect();
    const query = `SELECT * FROM oferta WHERE area_id = $1`;
    const offers = await db?.query(query, [areaId]);

    res.status(200).json({
      ok: true,
      status: 200,
      data: offers?.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getOffersDataByJobAndLocation = async (req: Request, res: Response) => {
  const { job, location } = req.params;

  try {
    const db = await dbConnect();
    const query = `SELECT * FROM oferta WHERE nombre_puesto ILIKE $1 AND PROVINCIA_ID = $2`;
    const offers = await db?.query(query, [`%${job}%`, location]);

    res.status(200).json({
      ok: true,
      status: 200,
      data: offers?.rows,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getOffersDataByLocation,
  getOffersDataByJob,
  getOffersDataByOfferArea,
  getOffersDataByJobAndLocation,
};
