import { Request, Response } from "express";
import dbConnect from "../database/db";
import brycpt from "bcrypt";
import createSendEmail from "../utils/emailService";
import { sesClient } from "../utils/libs/sesClient";

const email_code: number = Math.floor(100000 + Math.random() * 900000);
const email_code_company: number = Math.floor(100000 + Math.random() * 900000);

// CANDIDATE
const inCompleteRegisterCandidate = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "postulante" WHERE email = '${email}'`;

    const rows = await client?.query(queryEmailDuplicate);

    if (rows?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const queryInsert = `INSERT INTO "postulante" (email, account_confirm, email_code, active) VALUES ('${email}', FALSE, '${email_code}', FALSE)`;

    await client?.query(queryInsert);

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
  }
};

const completeRegisterCandidate = async (req: Request, res: Response) => {
  try {
    const { email, code, names, surnames, password } = req.body;
    const client = await dbConnect();

    const queryEmail = `SELECT email_code FROM "postulante" WHERE email = '${email}'`;

    const rows = await client?.query(queryEmail);

    if (rows?.rows[0].email_code !== code) {
      res.status(400).json({
        message: "El código no es válido",
      });
      return;
    }

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "postulante" WHERE email = '${email}' AND account_confirm = 'TRUE'`;

    const rowsVerification = await client?.query(queryEmailDuplicate);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const passwordEncrypt = await brycpt.hash(password, 10);

    const queryUpdate = `UPDATE "postulante" SET nombre = '${names}', apellidos = '${surnames}', password = '${passwordEncrypt}', account_confirm = TRUE, active = TRUE WHERE email = '${email}'`;

    await client?.query(queryUpdate);

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

//COMPANY
const inCompleteRegisterCompany = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "empresa" WHERE email = '${email}'`;

    const rows = await client?.query(queryEmailDuplicate);

    if (rows?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const queryInsert = `INSERT INTO "empresa" (email, account_confirm, email_code, active) VALUES ('${email}', FALSE, '${email_code_company}', FALSE)`;

    await client?.query(queryInsert);

    const sendEmail = createSendEmail(email, email_code_company);

    await sesClient.send(sendEmail);

    res.status(200).json({
      message: "Email enviado",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const completeRegisterCompany = async (req: Request, res: Response) => {
  try {
    const {
      email,
      email_code,
      name_company,
      password,
      phone,
      comercial_name,
      razon_social,
      sector,
      description,
    } = req.body;
    const client = await dbConnect();

    const queryEmail = `SELECT email_code FROM "empresa" WHERE email = '${email}'`;

    const rows = await client?.query(queryEmail);

    if (rows?.rows[0].email_code !== email_code) {
      res.status(400).json({
        message: "El código no es válido",
      });
      return;
    }

    const queryEmailDuplicate = `
    SELECT COUNT(*) 
    FROM "empresa" 
    WHERE email = '${email}' 
    AND account_confirm = 'TRUE' 
    AND active = 'TRUE'
`;

    const rowsVerification = await client?.query(queryEmailDuplicate);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const insertCompanyInfoQuery = `
      INSERT INTO "empresa_informacion" (movil, nombre_comercial, razon_social, descripcion_empresa)
      VALUES ('${phone}', '${comercial_name}', '${razon_social}', '${description}')
      RETURNING empresa_informacion_id
    `;

    const companyInfo = await client?.query(insertCompanyInfoQuery);
    const empresaInformationId = companyInfo?.rows[0].empresa_informacion_id;

    const passwordEncrypt = await brycpt.hash(password, 10);

    const updateCompanyQuery = `
      UPDATE "empresa"
      SET nombre_completo = '${name_company}', password = '${passwordEncrypt}', sector_id = '${sector}', account_confirm = TRUE, active = TRUE, empresa_informacion_id = ${empresaInformationId}
      WHERE email = '${email}'
      RETURNING empresa_informacion_id
    `;

    await client?.query(updateCompanyQuery);

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

//LOGIN - POSTULANTE
const loginAuthCandidate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const client = await dbConnect();

    // Obtener el hash de la contraseña almacenada en la base de datos
    const query = `SELECT * FROM "postulante" WHERE email = '${email}'`;
    const rows = await client?.query(query);

    if (rows?.rows.length === 0) {
      res.status(400).json({
        message: "El email no existe",
      });
      return;
    }

    const passwordHash = rows?.rows[0].password;

    const passwordMatch = await brycpt.compare(password, passwordHash);

    if (!passwordMatch) {
      res.status(400).json({
        message: "La contraseña es incorrecta",
      });
      return;
    }

    res.status(200).json({
      message: "Login correcto",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//LOGIN - EMPRESA
const loginAuthCompany = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const client = await dbConnect();

    // Obtener el hash de la contraseña almacenada en la base de datos
    const query = `SELECT * FROM "empresa" WHERE email = '${email}'`;
    const rows = await client?.query(query);

    if (rows?.rows.length === 0) {
      res.status(400).json({
        message: "El email no existe",
      });
      return;
    }

    const passwordHash = rows?.rows[0].password;

    const passwordMatch = await brycpt.compare(password, passwordHash);

    if (!passwordMatch) {
      res.status(400).json({
        message: "La contraseña es incorrecta",
      });
      return;
    }

    res.status(200).json({
      message: "Login correcto",
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
  inCompleteRegisterCompany,
  completeRegisterCompany,
  loginAuthCandidate,
  loginAuthCompany,
};
