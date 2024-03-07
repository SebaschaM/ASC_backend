import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getEducationInfo = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
        SELECT * FROM postulante_estudios
        WHERE postulante_id = $1
    `;

    const data = await db?.query(query, [postulanteId]);
    const studies = data?.rows.map((study) => {
      return {
        id: study.postulante_estudio_id,
        descripcion: study.descripcion_estudio,
        titulo: study.titulo,
        institucion: study.institucion,
        fechaInicio: study.anio_inicio,
        fechaFin: study.anio_fin,
      };
    });

    res.status(200).json({
      studies,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const insertEducationInfo = async (req: Request, res: Response) => {
  const {
    postulanteId,
    descripcionEstudio,
    titulo,
    institucion,
    anio_inicio,
    anio_fin,
  } = req.body;

  try {
    const db = await dbConnect();
    //TABLA postulante_estudios
    const query = `
            INSERT INTO postulante_estudios (postulante_id, descripcion_estudio, titulo, institucion, anio_inicio, anio_fin)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `;

    /*
        ON CONFLICT (postulante_id) DO UPDATE
            SET descripcion_estudio = $2,
            titulo = $3,
            institucion = $4,
            anio_inicio = $5,
            anio_fin = $6
            RETURNING *
        */

    const responseQuery = await db?.query(query, [
      postulanteId,
      descripcionEstudio,
      titulo,
      institucion,
      anio_inicio,
      anio_fin,
    ]);

    res.status(200).json({
      data: responseQuery?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEducationInfo = async (req: Request, res: Response) => {
  const { postulanteEstudioId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
        DELETE FROM postulante_estudios
        WHERE postulante_estudio_id = $1 `;

    await db?.query(query, [postulanteEstudioId]);

    res.status(200).json({
      response: "Estudio eliminado",
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateEducationInfo = async (req: Request, res: Response) => {
  const {
    postulanteId,
    descripcionEstudio,
    titulo,
    institucion,
    anio_inicio,
    anio_fin,
  } = req.body;

  try {
    const db = await dbConnect();
    //TABLA postulante_estudios
    const query = `
            INSERT INTO postulante_estudios (postulante_id, descripcion_estudio, titulo, institucion, anio_inicio, anio_fin)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `;

    /*
        ON CONFLICT (postulante_id) DO UPDATE
            SET descripcion_estudio = $2,
            titulo = $3,
            institucion = $4,
            anio_inicio = $5,
            anio_fin = $6
            RETURNING *
        */

    const responseQuery = await db?.query(query, [
      postulanteId,
      descripcionEstudio,
      titulo,
      institucion,
      anio_inicio,
      anio_fin,
    ]);

    res.status(200).json({
      data: responseQuery?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; // NO SE USA

export { getEducationInfo, insertEducationInfo, deleteEducationInfo };
