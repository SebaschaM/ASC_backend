import { Response, Request } from "express";
import dbConnect from "../../../database/db";

const changeEmail = async (req: Request, res: Response) => {
  const { postulanteId, email } = req.body;

  try {
    const db = await dbConnect();

    //VERIFICAR SI EMAIL YA EXISTE
    const queryCountCandidateEmail = `SELECT COUNT(email) FROM postulante WHERE email =$1`;
    const queryCountCompanyEmail = `SELECT COUNT(email) FROM empresa WHERE email = $1`;

    const rowsCandidate = await db?.query(queryCountCandidateEmail, [email]);
    const rowsCompany = await db?.query(queryCountCompanyEmail, [email]);

    if (rowsCandidate?.rows[0].count > 0 || rowsCompany?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
        status: 400,
      });
      return;
    }

    const query = `UPDATE postulante SET email = $1 WHERE postulante_id = $2`;

    await db?.query(query, [email, postulanteId]);

    res.status(200).json({
      ok: true,
      message: "Correo actualizado con éxito",
      status: 200,
    });

    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { changeEmail };
