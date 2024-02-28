import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const applyOffer = async (req: Request, res: Response) => {
  try {
    const { ofertaId, postulanteId } = req.body;

    // Validación de datos de entrada
    if (!ofertaId || !postulanteId) {
      return res.status(400).json({
        message: "Faltan datos para aplicar a la oferta",
        status: 400,
        ok: false,
      });
    }

    const client = await dbConnect();

    const query = `INSERT INTO public.postulacion(postulante_id, oferta_id, postulacion_estado_id, fecha_postulacion) VALUES ($1, $2, 1, CURRENT_TIMESTAMP)`;
    await client?.query(query, [postulanteId, ofertaId]);

    res.status(200).json({
      message: "Oferta aplicada",
      status: 200,
      ok: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getOffersByUser = async (req: Request, res: Response) => {
  try {
    const { postulanteId } = req.params;
    //console.log(postulanteId)

    if (!postulanteId) {
      return res.status(400).json({
        message: "Faltan datos para obtener las ofertas",
        status: 400,
        ok: false,
      });
    }

    const client = await dbConnect();

    const query = `
        SELECT
        *
        FROM
            postulante u_post
        LEFT JOIN postulacion post
            ON post.postulante_id = u_post.postulante_id
        WHERE post.postulante_id = $1`;

    const rows = await client?.query(query, [postulanteId]);

    res.status(200).json({
      message: "Ofertas obtenidas",
      status: 200,
      ok: true,
      data: rows?.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { applyOffer, getOffersByUser };
