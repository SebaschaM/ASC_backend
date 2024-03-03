import { Response, Request } from "express";
import dbConnect from "../../../database/db";

const changeVisibleCV = async (req: Request, res: Response) => {
  const { visibleState, postulanteId } = req.body;

  let cv_visible;
  
  try {
    const db = await dbConnect();

    if (visibleState === 1) {
      cv_visible = true;
    } else if (visibleState === 0) {
      cv_visible = false;
    }

    //en caso uno sea vacio o los dos

    if (cv_visible === undefined || postulanteId === undefined) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos para actualizar la visibilidad del CV",
        status: 400,
      });
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
