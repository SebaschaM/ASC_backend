import { Response, Request } from "express";
import dbConnect from "../../../database/db";
import bycript from "bcrypt";

const changePassword = async (req: Request, res: Response) => {
  const { postulanteId, password } = req.body;

  try {
    const db = await dbConnect();
    const query = `UPDATE postulante SET password = $1 WHERE postulante_id = $2`;

    // Encriptar nueva contraseña
    const passwordHash = await bycript.hash(password, 10);

    await db?.query(query, [passwordHash, postulanteId]);

    res.status(200).json({
      ok: true,
      message: "Contraseña actualizada con éxito",
      status: 200,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { changePassword };
