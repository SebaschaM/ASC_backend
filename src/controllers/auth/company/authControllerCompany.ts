import { Request, Response } from "express";
import dbConnect from "../../../database/db";
import brycpt from "bcrypt";
import createSendEmail from "../../../utils/emailService";
import { sesClient } from "../../../utils/libs/sesClient";
import { Company, CompanyInformation } from "../../../interfaces/user";

const email_code_company: number = Math.floor(100000 + Math.random() * 900000);
const email_code_company2: number = Math.floor(100000 + Math.random() * 900000);

const inCompleteRegisterCompany = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "empresa" WHERE email = $1 AND account_confirm = 'TRUE'`;

    const rowsVerification = await client?.query(queryEmailDuplicate, [email]);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email activo ya se encuentra registrado",
      });
      return;
    }

    const queryEmailDuplicateInactive = `SELECT COUNT(*) FROM "empresa" WHERE email = $1 AND account_confirm = 'FALSE'`;

    const rowsInactive = await client?.query(queryEmailDuplicateInactive, [
      email,
    ]);

    if (rowsInactive?.rows[0].count > 0) {
      const queryUpdateCodeEmail = `UPDATE "empresa" SET email_code = $1 WHERE email = $2`;

      await client?.query(queryUpdateCodeEmail, [email_code_company2, email]);

      const sendEmail = createSendEmail(email, email_code_company2);

      await sesClient.send(sendEmail);

      res.status(200).json({
        message:
          "El email ya se encuentra registrado, pero no ha sido activado",
        status: 200,
        ok: true,
        data: {
          email,
        }
      });
      return;
    }

    const queryInsert = `INSERT INTO "empresa" (email, account_confirm, email_code, active, created_at) VALUES ($1, FALSE, $2, FALSE, CURRENT_TIMESTAMP)`;

    await client?.query(queryInsert, [email, email_code_company]);

    const sendEmail = createSendEmail(email, email_code_company);

    await sesClient.send(sendEmail);

    res.status(200).json({
      message: "Se ha enviado un código de verificación a su correo electrónico",
      status: 200,
      ok: true,
      data: {
        email,
      }
    });

    return;
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
      password,
      movil,
      nombre_completo,
      nombre_comercial,
      razon_social,
      sector_id,
      descripcion_empresa,
    } = req.body;
    const client = await dbConnect();

    const queryEmailDuplicate = `SELECT COUNT(*) FROM "empresa" WHERE email = $1 AND account_confirm = 'TRUE' AND active = 'TRUE'`;

    const rowsVerification = await client?.query(queryEmailDuplicate, [email]);

    if (rowsVerification?.rows[0].count > 0) {
      res.status(400).json({
        message: "El email ya se encuentra registrado",
        status: 400,
      });
      return;
    }

    const queryInsert = `INSERT INTO "empresa_informacion" (movil, nombre_comercial, razon_social, descripcion_empresa) VALUES ($1, $2, $3, $4) RETURNING *`;

    const company_info = await client?.query(queryInsert, [
      movil,
      nombre_comercial,
      razon_social,
      descripcion_empresa,
    ]);

    const empresaInformationId = company_info?.rows[0].empresa_informacion_id;

    const passwordEncrypt = await brycpt.hash(password, 10);

    const queryUpdate = `UPDATE "empresa" SET nombre_completo = $1, password = $2, sector_id = $3, empresa_informacion_id = $4, account_confirm = TRUE, active = TRUE, created_at = CURRENT_TIMESTAMP WHERE email = $5 RETURNING *`;

    const rows = await client?.query(queryUpdate, [
      nombre_completo,
      passwordEncrypt,
      sector_id,
      empresaInformationId,
      email,
    ]);

    // ESTA TABLE SE ENCUENTRA RELACIONADA CON LA TABLA EMPRESA

    const user: Company = rows?.rows[0];
    const sector_idComp = user.sector_id;
    const rubro = user.rubro;
    const fullnames = user.nombre_completo;
    const pais = user.pais;
    const departamento_id = user.departamento_id;
    const provincia_id = user.provincia_id;
    const direccion = user.direccion;
    const emailCompany = user.email;
    const sitio_web = user.sitio_web;
    //const email_code = user.email_code;
    const avatar = user.avatar;

    const comapanyInformation: CompanyInformation = company_info?.rows[0];

    const razon_socialC = comapanyInformation.razon_social;
    const fecha_fundacion = comapanyInformation.fecha_fundacion;
    const ruc = comapanyInformation.ruc;
    const telefono = comapanyInformation.telefono;
    const movilComp = comapanyInformation.movil;
    const nombre_Company = comapanyInformation.nombre_comercial;
    const descriptionCompany = comapanyInformation.descripcion_empresa;

    res.status(200).json({
      message: "Registro completado",
      status: 200,
      ok: true,
      data: {
        emailCompany,
        sector_idComp,
        rubro,
        fullnames,
        pais,
        departamento_id,
        provincia_id,
        direccion,
        razon_socialC,
        avatar,
        sitio_web,
        fecha_fundacion,
        ruc,
        telefono,
        movilComp,
        nombre_Company,
        descriptionCompany,
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

const loginAuthCompany = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const client = await dbConnect();

    // Obtener el hash de la contraseña almacenada en la base de datos
    const query = `SELECT * FROM empresa INNER JOIN empresa_informacion ON empresa.empresa_informacion_id = empresa_informacion.empresa_informacion_id WHERE empresa.email = $1`;
    const rows = await client?.query(query, [email]);

    if (rows?.rows.length === 0) {
      res.status(400).json({
        message: "El email no existe",
        status: 400,
      });
      return;
    }

    const user = rows?.rows[0];
    const userPassword = rows?.rows[0].password;

    const passwordMatch = await brycpt.compare(password, userPassword);

    if (!passwordMatch) {
      res.status(400).json({
        message: "Contraseña incorrecta, inténtelo de nuevo",
        status: 400,
      });
      return;
    }

    const sector_idComp = user.sector_id;
    const rubro = user.rubro;
    const fullnames = user.nombre_completo;
    const pais = user.pais;
    const departamento_id = user.departamento_id;
    const provincia_id = user.provincia_id;
    const direccion = user.direccion;
    const emailCompany = user.email;
    const sitio_web = user.sitio_web;
    const avatar = user.avatar;
    const razon_socialC = user.razon_social;
    const fecha_fundacion = user.fecha_fundacion;
    const ruc = user.ruc;
    const telefono = user.telefono;
    const movilComp = user.movil;
    const nombre_Company = user.nombre_comercial;
    const descriptionCompany = user.descripcion_empresa;

    res.status(200).json({
      message: "Login correcto",
      status: 200,
      ok: true,
      data: {
        emailCompany,
        sector_idComp,
        rubro,
        fullnames,
        pais,
        departamento_id,
        provincia_id,
        direccion,
        avatar,
        razon_socialC,
        sitio_web,
        fecha_fundacion,
        ruc,
        telefono,
        movilComp,
        nombre_Company,
        descriptionCompany,
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

export { inCompleteRegisterCompany, completeRegisterCompany, loginAuthCompany };
