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
        direccion,
        descripcion_perfil
      FROM 
      postulante_contacto pc
      INNER JOIN postulante p
          ON pc.postulante_id = p.postulante_id
      WHERE pc.postulante_id = $1`;

    const queryAlternative = `
      SELECT
        nombre,
        apellidos,
        email, 
        cv,
        avatar,
        cv_visible,
        created_at
      FROM postulante WHERE postulante_id = $1`;

    if (!postulanteId) {
      res.status(400).json({
        message: "El id del postulante es requerido",
        ok: false,
      });
      return;
    }

    const data = await db?.query(query, [postulanteId]);
    let dataAlternative;

    if (data?.rows.length === 0) {
      dataAlternative = await db?.query(queryAlternative, [postulanteId]);
    }

    return res.status(200).json({
      data: data?.rows[0] || dataAlternative?.rows[0],
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
          ec.estado_civil_id,
          numero, 
          direccion,
          descripcion_perfil,
          tp.tipo_documento_id,
          tp.nombre_tipo_documento,
          documento
        FROM 
          postulante_contacto pc
        LEFT JOIN postulante p
            ON pc.postulante_id = p.postulante_id
        LEFT JOIN tipo_documento tp
            ON tp.tipo_documento_id = pc.tipo_documento_id
        LEFT JOIN estado_civil ec
            ON ec.estado_civil_id = pc.estado_civil_id
        WHERE pc.postulante_id = $1`;

    const alternativeQuery = `
      SELECT
        nombre,
        apellidos
      FROM postulante WHERE postulante_id = $1`;

    if (!postulanteId) {
      res.status(400).json({
        message: "El id del postulante es requerido",
        ok: false,
      });
      return;
    }

    const data = await db?.query(query, [postulanteId]);
    let dataAlternative;

    if (data?.rows.length === 0) {
      dataAlternative = await db?.query(alternativeQuery, [postulanteId]);
    }

    res.status(200).json({
      data: data?.rows[0] || dataAlternative?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getTypeDocument = async (req: Request, res: Response) => {
  try {
    const db = await dbConnect();
    const query = `SELECT * FROM tipo_documento`;

    const response = await db?.query(query);

    const data = response?.rows.map((typeDocument: any) => {
      return {
        id: typeDocument.tipo_documento_id,
        name: typeDocument.nombre_tipo_documento,
      };
    });

    res.status(200).json({
      data: data,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getCountries = async (req: Request, res: Response) => {
  try {
    const db = await dbConnect();
    const query = `SELECT * FROM pais`;

    const response = await db?.query(query);

    const data = response?.rows.map((country: any) => {
      return {
        id: country.pais_id,
        name: country.nombre_pais,
      };
    });

    res.status(200).json({
      data: data,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getCivilStatus = async (req: Request, res: Response) => {
  try {
    const db = await dbConnect();
    const query = `SELECT * FROM estado_civil`;

    const response = await db?.query(query);

    const data = response?.rows.map((civilStatus: any) => {
      return {
        id: civilStatus.estado_civil_id,
        name: civilStatus.nombre_estado_civil,
      };
    });

    res.status(200).json({
      data: data,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateIncompletePersonalInfo = async (req: Request, res: Response) => {
  const { postulanteId, numero, direccion, descripcion } = req.body;

  try {
    const db = await dbConnect();
    const query = `UPDATE postulante_contacto SET numero = $1, direccion = $2, descripcion_perfil = $3 WHERE postulante_id = $4 RETURNING *`;

    const data = await db?.query(query, [
      numero,
      direccion,
      descripcion,
      postulanteId,
    ]);

    res.status(200).json({
      message: "Información guardada",
      data: data?.rows[0],
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; // NO SE USA ESA CONSULTA

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
    descripcionPerfil,
    numero,
    direccion,
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

    console.log("INSERTANDO EN POSTULANTE");

    //TABLA POSTULANTE_CONTACTO
    const query = `
      INSERT INTO postulante_contacto(
          postulante_id, 
          pais_id, 
          fecha_nacimiento, 
          estado_civil_id, 
          tipo_documento_id, 
          documento,
          descripcion_perfil,
          numero,
          direccion
          )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (postulante_id)
      DO UPDATE
      SET
      pais_id = $2,
      fecha_nacimiento = $3,
      estado_civil_id = $4,
      tipo_documento_id = $5,
      documento = $6,
      descripcion_perfil = $7,
      numero = $8,
      direccion = $9
      RETURNING *
    `;

    console.log("INSERTANDO ANTES DE INGRESAR");

    const responseQueryPostulanteContacto = await db?.query(query, [
      postulanteId,
      paisId,
      fechaNacimiento,
      estadoCivil,
      tipoDocumentoId,
      documento,
      descripcionPerfil,
      numero,
      direccion,
    ]);

    console.log("LISTO");

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

export {
  getPersonalInfo,
  updatePersonalInfo,
  getIncompletePersonalInfo,
  getTypeDocument,
  getCountries,
  getCivilStatus,
};
