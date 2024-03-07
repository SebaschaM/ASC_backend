import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getLanguageInfo = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
      SELECT
      pi.postulante_idioma_id,
      pi.idioma_id,
      i.idioma,
      pi.nivel
      FROM
      postulante_idiomas pi
      INNER JOIN idiomas i
        ON i.idioma_id = pi.idioma_id
      WHERE
      postulante_id = $1
    `;

    if (!postulanteId) {
      res.status(400).json({
        message: "El id del postulante es requerido",
        ok: false,
      });
      return;
    }

    const data = await db?.query(query, [postulanteId]);
    const languages = data?.rows.map((language) => {
      return {
        id: language.postulante_idioma_id,
        idiomaId: language.idioma_id,
        idioma: language.idioma,
        nivel: language.nivel,
      };
    });

    res.status(200).json({
      data: languages,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const insertLanguageInfo = async (req: Request, res: Response) => {
  const { postulanteId, idiomaId, nivelIdioma } = req.body;

  try {
    const db = await dbConnect();

    const query = `
        INSERT INTO postulante_idiomas (postulante_id, idioma_id, nivel)
        VALUES ($1, $2, $3)
        RETURNING idioma_id, nivel
    `;

    /*
        ON CONFLICT (postulante_id) DO UPDATE
        SET nivel = $3
        RETURNING idioma_id, nivel
    */

    if (!postulanteId || !idiomaId || !nivelIdioma) {
      res.status(400).json({
        message: "Todos los campos son requeridos",
        ok: false,
      });
      return;
    }

    const responseQuery = await db?.query(query, [
      postulanteId,
      idiomaId,
      nivelIdioma,
    ]);

    res.status(200).json({
      data: responseQuery?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLanguageInfo = async (req: Request, res: Response) => {
  const { languageId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
      DELETE FROM postulante_idiomas
      WHERE postulante_idioma_id = $1
    `;

    if (!languageId) {
      res.status(400).json({
        message: "El id del idioma es requerido",
        ok: false,
      });
      return;
    }

    await db?.query(query, [languageId]);

    res.status(200).json({
      reponse: "Idioma eliminado correctamente",
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateLanguageInfo = async (req: Request, res: Response) => {
  const { postulanteId, idiomaId, nivelIdioma } = req.body;

  try {
    const db = await dbConnect();

    const query = `
        INSERT INTO postulante_idiomas (postulante_id, idioma_id, nivel)
        VALUES ($1, $2, $3)
        RETURNING idioma_id, nivel
    `;

    /*
        ON CONFLICT (postulante_id) DO UPDATE
        SET nivel = $3
        RETURNING idioma_id, nivel
    */

    if (!postulanteId || !idiomaId || !nivelIdioma) {
      res.status(400).json({
        message: "Todos los campos son requeridos",
        ok: false,
      });
      return;
    }

    const responseQuery = await db?.query(query, [
      postulanteId,
      idiomaId,
      nivelIdioma,
    ]);

    res.status(200).json({
      data: responseQuery?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; //NO SE USA

export { getLanguageInfo, insertLanguageInfo, deleteLanguageInfo };
