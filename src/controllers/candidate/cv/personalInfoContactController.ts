import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getIncompletePersonalInfo = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
      SELECT 
        nombre,
        apellidos,
        email,
        cv_visible,
        cv,
        numero,
        direccion
      FROM 
      postulante_contacto pc
      INNER JOIN postulante p
          ON pc.postulante_id = p.postulante_id
      WHERE pc.postulante_id = $1`;

    if (!postulanteId) {
      res.status(400).json({
        message: "El id del postulante es requerido",
        ok: false,
      });
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

const getPersonalInfo = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();
    const query = `
        SELECT 
        nombre,
        apellidos,
        pais_id,
        fecha_nacimiento,
        estado_civil, 
        tipo_documento_id,
        documento
        FROM 
        postulante_contacto pc
        INNER JOIN postulante p
            ON pc.postulante_id = p.postulante_id
        WHERE pc.postulante_id = $1
    `;

    if (!postulanteId) {
      res.status(400).json({
        message: "El id del postulante es requerido",
        ok: false,
      });
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

const insertPersonalInfo = async (req: Request, res: Response) => {
  const {
    postulanteId,
    nombre,
    apellidos,
    //paisId,
    fechaNacimiento,
    estadoCivil,
    tipoDocumentoId,
    documento,
  } = req.body;

  try {
    const db = await dbConnect();

    //TABLA POSTULANTE
    const queryPostulante = `
        UPDATE postulante
        SET nombre = $1,
        apellidos = $2
        WHERE postulante_id = $3
        RETURNING *
    `;

    const responseQueryPostulante = await db?.query(queryPostulante, [
      nombre,
      apellidos,
      postulanteId,
    ]);

    //TABLA POSTULANTE_CONTACTO
    const query = `
      INSERT INTO postulante_contacto(
          postulante_id, 
          pais_id, 
          fecha_nacimiento, 
          estado_civil, 
          tipo_documento_id, 
          documento)
      VALUES ($1, 1, $2, $3, $4, $5)
      ON CONFLICT (postulante_id)
      DO UPDATE
      SET fecha_nacimiento = $2,
      estado_civil = $3,
      tipo_documento_id = $4,
      documento = $5
      RETURNING *
    `;

    const responseQueryPostulanteContacto = await db?.query(query, [
      postulanteId,
      fechaNacimiento,
      estadoCivil,
      tipoDocumentoId,
      documento,
    ]);

    const dataPersonalInfo = {
      ...responseQueryPostulante?.rows[0],
      ...responseQueryPostulanteContacto?.rows[0],
    };

    res.status(200).json({
      message: "Información guardada",
      data: dataPersonalInfo,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getPersonalInfo, insertPersonalInfo, getIncompletePersonalInfo };
