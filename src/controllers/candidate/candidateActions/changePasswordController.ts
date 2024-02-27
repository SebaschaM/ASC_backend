import { Response, Request } from "express";
import dbConnect from "../../../database/db";
import bycript from "bcrypt";

const changePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const db = await dbConnect();
    const query = `UPDATE postulante SET password = $1 WHERE email = $2`;

    // Encriptar nueva contraseña
    const passwordHash = await bycript.hash(password, 10);

    await db?.query(query, [passwordHash, email]);

    res.status(200).json({ message: "Contraseña actualizada" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { changePassword };