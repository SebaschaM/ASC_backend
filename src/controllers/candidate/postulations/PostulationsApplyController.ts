import { Response, Request } from "express";
import dbConnect from "../../../database/db";

const getPostulationsApply = async (req: Request, res: Response) => {
  const { postulanteId } = req.params;

  try {
    const db = await dbConnect();

    const query = `
        SELECT
        of.nombre_puesto,
        of.empresa_id,
        of.departamento_id,
        of.provincia_id,
        einf.nombre_comercial,
        em.avatar,
        dep.nombre_departamento, 
        pr.nombre_provincia,
        postes.estado,
        postes.postulacion_estado_id,
        post.actualizacion_descripcion,
        post.postulante_id,
        post.postulacion_id,
        post.fecha_postulacion,
        post.postulacion_id

        FROM
        oferta of
        INNER JOIN postulacion post
            ON of.oferta_id = post.oferta_id
        INNER JOIN postulacion_estado postes
            ON post.postulacion_estado_id = postes.postulacion_estado_id
        INNER JOIN empresa em
            ON of.empresa_id = em.empresa_id
        INNER JOIN empresa_informacion einf
            ON einf.empresa_informacion_id = em.empresa_informacion_id
        INNER JOIN departamento dep
            ON of.departamento_id = dep.departamento_id
        INNER JOIN provincia pr
            ON of.provincia_id = pr.provincia_id
        WHERE postulante_id = $1
    `;

    const response = await db?.query(query, [postulanteId]);

    const offersApply = response?.rows.map((offer: any) => {
      return {
        puesto: offer.nombre_puesto,
        empresa: offer.nombre_comercial,
        avatar: offer.avatar,
        departamento: offer.nombre_departamento,
        provincia: offer.nombre_provincia,
        estado: offer.estado,
        descripcion_estado: offer.actualizacion_descripcion,
        postulante_id: offer.postulante_id,
        fecha_postulacion: offer.fecha_postulacion,
        id_estado_postulacion: offer.postulacion_estado_id,
        id: offer.postulacion_id,
      };
    });

    res.status(200).json({
      ok: true,
      data: offersApply,
      status: 200,
    });

    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const savePostulationStateCandidate = async (req: Request, res: Response) => {
  const { postulacionId, estadoId } = req.body;

  try {
    const db = await dbConnect();

    const query = `
        UPDATE postulacion
        SET postulacion_estado_id = $1
        WHERE postulacion_id = $2
    `;

    await db?.query(query, [estadoId, postulacionId]);

    res.status(200).json({
      ok: true,
      message: "Estado de postulación actualizado",
      status: 200,
    });

    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { getPostulationsApply };
