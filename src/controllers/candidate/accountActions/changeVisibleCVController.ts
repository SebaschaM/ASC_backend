import { Response, Request } from "express";
import dbConnect from "../../../database/db";

const changeVisibleCV = async (req: Request, res: Response) => {
  const { visible, postulanteId } = req.body;

  let cv_visible;
  
  try {
    const db = await dbConnect();

    if (visible === 1) {
      cv_visible = true;
    } else if (visible === 0) {
      cv_visible = false;
    }

    const query = `UPDATE postulante SET cv_visible = $1 WHERE postulante_id = $2`;

    await db?.query(query, [cv_visible, postulanteId]);

    res.status(200).json({
      ok: true,
      message: "Visibilidad del CV actualizada con éxito",
      status: 200,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { changeVisibleCV };
