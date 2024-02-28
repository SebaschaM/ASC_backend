import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getOffersDataByLocation = async (req: Request, res: Response) => {
  const { location } = req.params;

  try {
    const db = await dbConnect(); // Invoke the dbConnect function to get the Client object
    const query = `
      SELECT 
      * 
      FROM 
      oferta o
      LEFT JOIN provincia p
        ON o.provincia_id = p.provincia_id
      LEFT JOIN departamento d
        ON d.departamento_id = p.departamento_id
      LEFT JOIN empresa e
        ON o.empresa_id = e.empresa_id
      LEFT JOIN empresa_informacion ei
        ON ei.empresa_informacion_id = e.empresa_informacion_id
      LEFT JOIN oferta_jornada oj
        ON oj.oferta_jornada_id = o.jornada_id
      LEFT JOIN oferta_modalidad om
        ON om.oferta_modalidad_id = o.modalidad_trabajo_id
      LEFT JOIN oferta_area oa
        ON oa.oferta_area_id = o.area_id
      WHERE 
        o.provincia_id = $1    
    `;
    const result = await db.query(query, [location]);
    const offers = result?.rows.map((offer: any) => {
      return {
        oferta_id: offer.oferta_id,
        empresa: {
          empresa_id: offer.empresa_id,
          empresa_informacion_id: offer.empresa_informacion_id,
          nombre_completo: offer.nombre_comercial,
          departamento: offer.nombre_departamento,
          provincia: offer.nombre_provincia,
          direccion: offer.direccion,
          email: offer.email,
          sitio_web: offer.sitio_web,
          avatar: offer.avatar,
        },
        jornada: {
          jornada_id: offer.jornada_id,
          nombre: offer.jornada,
        },
        modalidad_trabajo: {
          modalidad_trabajo_id: offer.oferta_modalidad_id,
          nombre: offer.modalidad,
        },
        area: {
          area_id: offer.area_id,
          nombre: offer.nombre,
        },
        nombre_puesto: offer.nombre_puesto,
        vacantes: offer.vacantes,
        tipo_moneda: {
          tipo_moneda_id: offer.tipo_moneda_id,
          nombre: offer.nombre_moneda,
        },
        descripcion: offer.descripcion,
        tipo_contrato: {
          tipo_contrato_id: offer.contrato_id,
          nombre: offer.tipo_contrato,
        },
        fecha_creacion: offer.fecha_creacion,
      };
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: offers,
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
