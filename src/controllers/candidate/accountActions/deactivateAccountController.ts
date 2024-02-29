import { Response, Request } from "express";
import dbConnect from "../../../database/db";

const deactivateAccount = async (req: Request, res: Response) => {
  const { postulanteId, reasonDelete } = req.body;

  try {
    const db = await dbConnect();
    const query = `UPDATE postulante SET active = false, reason_delete = $1 WHERE postulante_id = $2`;

    //EN CASO SEAN VACIOS LOS CAMPOS
    if (postulanteId === undefined || reasonDelete === undefined) {
      return res.status(400).json({
        message: "Faltan datos para desactivar la cuenta",
      });
    }

    await db?.query(query, [reasonDelete, postulanteId]);

    res.status(200).json({ message: "Cuenta desactivada" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { deactivateAccount };
