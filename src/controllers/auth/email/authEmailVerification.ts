import { Request, Response } from "express";

import dbConnect from "../../../database/db";

const verifyEmailCode = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();

    const { email, email_code } = req.body;
    // DEBE IR EN OTRO CONTROLLER
    const queryEmail = `SELECT email_code FROM "postulante" WHERE email = $1`;

    const rows = await client?.query(queryEmail, [email]);

    if (rows?.rows[0].email_code !== email_code) {
      res.status(400).json({
        message: "Código incorrecto",
        status: 400,
      });

      return;
    }

    res.status(200).json({
      message: "Código correcto, siguiente paso",
      status: 200,
      ok: true,
    });

    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
};

const verifyEmailCodeCompany = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();

    const { email, email_code } = req.body;
    // DEBE IR EN OTRO CONTROLLER
    const queryEmail = `SELECT email_code FROM "empresa" WHERE email = $1`;

    const rows = await client?.query(queryEmail, [email]);

    if (rows?.rows[0].email_code !== email_code) {
      res.status(400).json({
        message: "Código incorrecto",
        status: 400,
      });

      return;
    }

    res.status(200).json({
      message: "Código correcto, siguiente paso",
      status: 200,
      ok: true,
    });

    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
}

export {
  verifyEmailCode,
  verifyEmailCodeCompany
};
