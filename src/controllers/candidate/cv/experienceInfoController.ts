import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getExperienceInfo = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
      SELECT * FROM postulante_experiencia
      WHERE postulante_id = $1
    `;

    const response = await db?.query(query, [postulanteId]);
    const experiences = response?.rows.map((experience) => {
      return {
        id: experience.postulante_experiencia_id,
        empresa: experience.empresa,
        cargo: experience.cargo,
        anio_inicio: experience.anio_inicio,
        anio_fin: experience.anio_fin,
        funciones: experience.funciones,
      };
    });

    res.status(200).json({
      data: experiences,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const insertExperienceInfo = async (req: Request, res: Response) => {
  const { postulanteId, cargo, funciones, empresa, anio_inicio, anio_fin } =
    req.body;

  try {
    const db = await dbConnect();
    //TABLA postulante_experiencia
    const query = `
        INSERT INTO postulante_experiencia (postulante_id, empresa, cargo, anio_inicio, anio_fin, funciones)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;

    /*
    ON CONFLICT (postulante_id) DO UPDATE
        SET empresa = $2,
        cargo = $3,
        anio_inicio = $4,
        anio_fin = $5,
        funciones = $6
        RETURNING *
    */

    const responseQuery = await db?.query(query, [
      postulanteId,
      empresa,
      cargo,
      anio_inicio,
      anio_fin,
      funciones,
    ]);

    res.status(200).json({
      data: responseQuery?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExperienceInfo = async (req: Request, res: Response) => {
  const { experienceId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
      DELETE FROM postulante_experiencia
      WHERE postulante_experiencia_id = $1
    `;

    await db?.query(query, [experienceId]);

    res.status(200).json({
      response: "Experiencia eliminada correctamente",
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateExperienceInfo = async (req: Request, res: Response) => {
  const { postulanteId, cargo, funciones, empresa, anio_inicio, anio_fin } =
    req.body;

  try {
    const db = await dbConnect();
    //TABLA postulante_experiencia
    const query = `
        INSERT INTO postulante_experiencia (postulante_id, empresa, cargo, anio_inicio, anio_fin, funciones)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;

    /*
    ON CONFLICT (postulante_id) DO UPDATE
        SET empresa = $2,
        cargo = $3,
        anio_inicio = $4,
        anio_fin = $5,
        funciones = $6
        RETURNING *
    */

    const responseQuery = await db?.query(query, [
      postulanteId,
      empresa,
      cargo,
      anio_inicio,
      anio_fin,
      funciones,
    ]);

    res.status(200).json({
      data: responseQuery?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; //NO SE USA

export { getExperienceInfo, insertExperienceInfo, deleteExperienceInfo };
