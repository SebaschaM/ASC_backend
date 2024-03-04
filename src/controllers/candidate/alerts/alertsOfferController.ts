import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getAlertsOffer = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();

    const query = `SELECT * FROM postulante_alertas WHERE postulante_id = $1`;

    const response = await db?.query(query, [postulanteId]);

    const alerts = response?.rows.map((alert: any) => {
      return {
        id: alert.alerta_id,
        postulante_id: alert.postulante_id,
        puesto_interes: alert.puesto_interes,
        ubicacion: alert.ubicacion,
        frecuencia: alert.frecuencia,
      };
    });

    res.status(200).json({
      data: alerts,
      ok: true,
      status: 200,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateAlertOffer = async (req: Request, res: Response) => {
  const { alertId, puesto_interes, ubicacion, frecuencia, postulante_id } =
    req.body;

  try {
    const db = await dbConnect();

    const query = `UPDATE postulante_alertas SET puesto_interes = $1, ubicacion = $2, frecuencia = $3 WHERE alerta_id = $4 AND postulante_id = $5`;

    await db?.query(query, [
      puesto_interes,
      ubicacion,
      frecuencia,
      alertId,
      postulante_id,
    ]);

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Alerta actualizada correctamente",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const insertAlertOffer = async (req: Request, res: Response) => {
  const { puesto_interes, ubicacion, frecuencia, postulante_id } = req.body;

  try {
    const db = await dbConnect();

    const query = `INSERT INTO postulante_alertas (puesto_interes, ubicacion, frecuencia, postulante_id) VALUES ($1, $2, $3, $4)`;

    await db?.query(query, [
      puesto_interes,
      ubicacion,
      frecuencia,
      postulante_id,
    ]);

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Alerta creada correctamente",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getAlertsOffer, updateAlertOffer, insertAlertOffer };
