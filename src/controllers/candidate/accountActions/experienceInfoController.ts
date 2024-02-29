import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getExperienceInfo = async (req: Request, res: Response) => {
  const { postulanteId } = req.body;

  try {
    const db = await dbConnect();
    const query = `
            SELECT *
            FROM postulante_experiencia
            WHERE postulante_id = $1
        `;

    if (!db) {
      res.status(500).json({ error: "Error en la base de datos" });
      return;
    }

    const data = await db?.query(query, [postulanteId]);

    res.status(200).json({
      data: data?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateExperienceInfo = async (req: Request, res: Response) => {
  const { postulanteId, empresa, cargo, fechaInicio, fechaFin, descripcion } =
    req.body;

  try {
    const db = await dbConnect();
    const query = `
                UPDATE postulante_experiencia
                SET 
                    empresa = $1,
                    cargo = $2,
                    fecha_inicio = $3,
                    fecha_fin = $4,
                    descripcion = $5
                WHERE postulante_id = $6
            `;

    if (!db) {
      res.status(500).json({ error: "Error en la base de datos" });
      return;
    }

    await db?.query(query, [
      empresa,
      cargo,
      fechaInicio,
      fechaFin,
      descripcion,
      postulanteId,
    ]);

    res.status(200).json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const insertExperienceInfo = async (req: Request, res: Response) => {
  const { postulanteId, empresa, cargo, fechaInicio, fechaFin, descripcion } =
    req.body;

  try {
    const db = await dbConnect();
    const query = `
                INSERT INTO postulante_experiencia
                (postulante_id, empresa, cargo, fecha_inicio, fecha_fin, descripcion)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;

    if (!db) {
      res.status(500).json({ error: "Error en la base de datos" });
      return;
    }

    await db?.query(query, [
      postulanteId,
      empresa,
      cargo,
      fechaInicio,
      fechaFin,
      descripcion,
    ]);

    res.status(200).json({ ok: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}