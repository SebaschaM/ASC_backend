import { Response, Request } from "express";
import dbConnect from "../../../database/db";

const deactivateAccount = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const db = await dbConnect();
    const query = `UPDATE postulante SET activo = false WHERE email = $1`;

    await db?.query(query, [email]);

    res.status(200).json({ message: "Cuenta desactivada" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { deactivateAccount };