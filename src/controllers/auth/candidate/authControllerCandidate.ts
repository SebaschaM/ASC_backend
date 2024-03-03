import { Request, Response } from "express";
import dbConnect from "../../../database/db";
import brycpt from "bcrypt";
import createSendEmail from "../../../utils/emailService";
import { sesClient } from "../../../utils/libs/sesClient";
import { Candidate } from "../../../interfaces/user";

const email_code: number = Math.floor(100000 + Math.random() * 900000);
const email_code2: number = Math.floor(100000 + Math.random() * 900000);

// CANDIDATE
const inCompleteRegisterCandidate = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'TRUE'`;

    const rowsVerification = await client?.query(queryEmailDuplicate, [email]);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
        status: 400,
      });
      return;
    }

    const queryEmailDuplicateInactive = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'FALSE'`;

    const rowsInactive = await client?.query(queryEmailDuplicateInactive, [
      email,
    ]);

    if (rowsInactive?.rows[0].count > 0) {
      res.status(200).json({
        ok: true,
        status: 200,
        message:
          "El email ya se encuentra registrado, pero no ha sido activado",
        data: {
          email,
        },
      });

      const queryUpdateCodeEmail = `UPDATE "postulante" SET email_code = $1 WHERE email = $2`;

      await client?.query(queryUpdateCodeEmail, [email_code2, email]);

      const sendEmail = createSendEmail(email, email_code2);

      await sesClient.send(sendEmail);

      return;
    }

    //EN RESUMEN, SI EL EMAIL NO ESTÁ DUPLICADO, SE INSERTA EN LA BASE DE DATOS, PERO CON EL USUARIO INACTIVO
    const queryInsert = `INSERT INTO "postulante" (email, account_confirm, email_code, active, created_at) VALUES ($1, FALSE, $2, FALSE, CURRENT_TIMESTAMP)`;

    await client?.query(queryInsert, [email, email_code]);

    const sendEmail = createSendEmail(email, email_code);

    await sesClient.send(sendEmail);

    res.status(200).json({
      message: "Email enviado",
      status: 200,
      ok: true,
      data: {
        email,
      },
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

const completeRegisterCandidate = async (req: Request, res: Response) => {
  //PUT
  try {
    const { email, nombres, apellidos, password } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicateActivate = `SELECT COUNT(*) FROM "postulante" WHERE email = $1 AND account_confirm = 'TRUE'`;

    const rowsVerification = await client?.query(queryEmailDuplicateActivate, [
      email,
    ]);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
        status: 400,
      });
      return;
    }

    const passwordEncrypt = await brycpt.hash(password, 10);

    const queryUpdate = `UPDATE "postulante" SET nombre = $1, cv_visible = false, apellidos = $2, password = $3, account_confirm = TRUE, active = TRUE WHERE email = $4 RETURNING *`;

    const rows = await client?.query(queryUpdate, [
      nombres,
      apellidos,
      passwordEncrypt,
      email,
    ]);

    const user: Candidate = rows?.rows[0];
    const id_user = user.postulante_id;
    const emailCandidate = user.email;
    const nombresC = user.nombre;
    const apellidosC = user.apellidos;
    const avatar = user.avatar;
    const cv = user.cv;
    const cv_visible = user.cv_visible;
    const created_at = user.created_at;

    res.status(200).json({
      message: "Usuario activado",
      status: 200,
      ok: true,
      data: {
        id_user,
        emailCandidate,
        nombresC,
        apellidosC,
        avatar,
        cv,
        cv_visible,
        created_at,
      },
    });

    return;
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
        message: "El email no se encuentra registrado",
        status: 400,
      });
      return;
    }

    //EXTRAER TODA LA INFO DE LA QUERY
    const user: Candidate = rows?.rows[0];
    const id_user = user.postulante_id;
    const emailCandidate = user.email;
    const nombresC = user.nombre;
    const apellidosC = user.apellidos;
    const passwordHash = user.password;
    const avatar = user.avatar;
    const cv = user.cv;
    const cv_visible = user.cv_visible;
    const created_at = user.created_at;

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
      ok: true,
      data: {
        id_user,
        emailCandidate,
        nombresC,
        apellidosC,
        avatar,
        cv,
        cv_visible,
        created_at,
      },
    });
    return;
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
