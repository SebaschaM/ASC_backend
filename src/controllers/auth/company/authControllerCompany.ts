import { Request, Response } from "express";
import dbConnect from "../../../database/db";
import brycpt from "bcrypt";
import createSendEmail from "../../../utils/emailService";
import { sesClient } from "../../../utils/libs/sesClient";
import { Company } from "../../../interfaces/user";

const email_code_company: number = Math.floor(100000 + Math.random() * 900000);

const inCompleteRegisterCompany = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "empresa" WHERE email = $1`;

    const rows = await client?.query(queryEmailDuplicate, [email]);

    if (rows?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
      });
      return;
    }

    const queryInsert = `INSERT INTO "empresa" (email, account_confirm, email_code, active) VALUES ($1, FALSE, $2, FALSE)`;

    await client?.query(queryInsert, [email, email_code_company]);

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

    const queryEmail = `SELECT email_code FROM "empresa" WHERE email = $1`;

    const rows = await client?.query(queryEmail, [email]);

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
        VALUES ($1, $2, $3, $4)
        RETURNING empresa_informacion_id
      `;

    const companyInfo = await client?.query(insertCompanyInfoQuery, [
      phone,
      comercial_name,
      razon_social,
      description,
    ]);
    const empresaInformationId = companyInfo?.rows[0].empresa_informacion_id;
    console.log("registrando");
    const passwordEncrypt = await brycpt.hash(password, 10);

    const updateCompanyQuery = `
        UPDATE "empresa"
        SET nombre_completo = $1, password = $2, sector_id = $3, account_confirm = TRUE, active = TRUE, empresa_informacion_id = $4, created_at = CURRENT_TIMESTAMP
        WHERE email = $5
        RETURNING empresa_informacion_id
      `;

    await client?.query(updateCompanyQuery, [
      name_company,
      passwordEncrypt,
      sector,
      empresaInformationId,
      email,
    ]);

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

const loginAuthCompany = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const client = await dbConnect();

    // Obtener el hash de la contraseña almacenada en la base de datos
    const query = `
    SELECT *
    FROM empresa
    INNER JOIN empresa_informacion ON empresa.empresa_informacion_id = empresa_informacion.empresa_informacion_id
    WHERE empresa.email = $1
    `;
    const rows = await client?.query(query, [email]);

    if (rows?.rows.length === 0) {
      res.status(400).json({
        message: "El email no existe",
      });
      return;
    }

    const company: Company = rows?.rows[0];
    const sector_id = company.sector_id;
    const rubro = company.rubro;
    const pais = company.pais;
    const departamento_id = company.departamento_id;
    const provincia_id = company.provincia_id;
    const sitio_web = company.sitio_web;
    const razon_social = company.razon_social;
    const fechas_fundacion = company.fechas_fundacion;
    const ruc = company.ruc;
    const telefono = company.telefono;
    const movil = company.movil;
    const nombre_comercial = company.nombre_comercial;
    const descripcion_empresa = company.descripcion_empresa;
    const passwordCompany = rows?.rows[0].password;

    const passwordMatch = await brycpt.compare(password, passwordCompany);

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
        email,
        sector_id,
        rubro,
        pais,
        departamento_id,
        provincia_id,
        sitio_web,
        razon_social,
        fechas_fundacion,
        ruc,
        telefono,
        movil,
        nombre_comercial,
        descripcion_empresa,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { inCompleteRegisterCompany, completeRegisterCompany, loginAuthCompany };
