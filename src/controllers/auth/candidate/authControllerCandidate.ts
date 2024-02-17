import { Request, Response } from "express";
import dbConnect from "../../../database/db";
import brycpt from "bcrypt";
import createSendEmail from "../../../utils/emailService";
import { sesClient } from "../../../utils/libs/sesClient";
import { Candidate } from "../../../interfaces/user";

const email_code: number = Math.floor(100000 + Math.random() * 900000);

// CANDIDATE
const inCompleteRegisterCandidate = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "postulante" WHERE email = $1`;

    const rows = await client?.query(queryEmailDuplicate, [email]);

    if (rows?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const queryInsert = `INSERT INTO "postulante" (email, account_confirm, email_code, active) VALUES ($1, FALSE, $2, FALSE)`;

    await client?.query(queryInsert, [email, email_code]);

    const sendEmail = createSendEmail(email, email_code);

    await sesClient.send(sendEmail);

    res.status(200).json({
      message: "Email enviado",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
    return;
  }
};

const completeRegisterCandidate = async (req: Request, res: Response) => {
  try {
    const { email, code, names, surnames, password } = req.body;
    const client = await dbConnect();

    const queryEmail = `SELECT email_code FROM "postulante" WHERE email = $1`;

    const rows = await client?.query(queryEmail, [email]);

    if (rows?.rows[0].email_code !== code) {
      res.status(400).json({
        message: "El código no es válido",
      });
      return;
    }

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'TRUE'`;

    const rowsVerification = await client?.query(queryEmailDuplicate, [email]);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const passwordEncrypt = await brycpt.hash(password, 10);

    const queryUpdate = `UPDATE "postulante" SET nombre = $1, apellidos = $2, password = $3, account_confirm = TRUE, active = TRUE, created_at = CURRENT_TIMESTAMP WHERE email = $4`;

    await client?.query(queryUpdate, [names, surnames, passwordEncrypt, email]);

    res.status(200).json({
      message: "Registro completado",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginAuthCandidate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const client = await dbConnect();

    // Obtener el hash de la contraseña almacenada en la base de datos
    const query = `SELECT * FROM "postulante" WHERE email = $1`;
    const rows = await client?.query(query, [email]);

    if (rows?.rows.length === 0) {
      res.status(400).json({
        message: "El email no existe",
      });
      return;
    }

    //EXTRAER TODA LA INFO DE LA QUERY
    const user: Candidate = rows?.rows[0];
    const emailCandidate = user.email;
    const nombres = user.nombre;
    const apellidos = user.apellidos;
    const passwordHash = user.password;
    const avatar = user.avatar;
    const cv = user.cv;

    //COMPARAR LA CONTRASEÑA
    const passwordMatch = await brycpt.compare(password, passwordHash);

    if (!passwordMatch) {
      res.status(400).json({
        message: "La contraseña es incorrecta",
      });
      return;
    }

    res.status(200).json({
      message: "Login correcto",
      status: 200,
      data: {
        emailCandidate,
        nombres,
        apellidos,
        avatar,
        cv,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  inCompleteRegisterCandidate,
  completeRegisterCandidate,
  loginAuthCandidate,
};
