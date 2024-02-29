import { Request, Response } from "express";
import dbConnect from "../../../database/db";

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

const updatePersonalInfo = async (req: Request, res: Response) => {
  const {
    postulanteId,
    nombre,
    apellidos,
    paisId,
    fechaNacimiento,
    estadoCivil,
    tipoDocumentoId,
    documento,
  } = req.body;

  try {
    const db = await dbConnect();
    const query = `
        UPDATE postulante_contacto
        SET 
            nombre = $1,
            apellidos = $2,
            --pais_id = $3,
            fecha_nacimiento = $4,
            estado_civil = $5,
            tipo_documento_id = $6,
            documento = $7
        WHERE postulante_id = $8
        RETURNING *
    `;

    const data = await db?.query(query, [
      nombre,
      apellidos,
      paisId,
      fechaNacimiento,
      estadoCivil,
      tipoDocumentoId,
      documento,
      postulanteId,
    ]);

    res.status(200).json({
      message: "Información actualizada",
      data: data?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getPersonalInfo, updatePersonalInfo };
