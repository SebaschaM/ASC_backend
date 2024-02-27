import { Response, Request } from "express";
import dbConnect from "../../../database/db";

//PENDIENTE DE REVISIÓN

const updateDataAccount = async (req: Request, res: Response) => {
  const { email, name, lastname, phone
    } = req.body;

    try {
        const db = await dbConnect();
        const query = `UPDATE postulante SET nombre = $1, apellido = $2, telefono = $3 WHERE email = $4`;
    
        await db?.query(query, [name, lastname, phone, email]);
    
        res.status(200).json({ message: "Datos actualizados" });
        }

    catch (error: any) {
        res.status(500).json({ error: error.message });
    }

}

export { updateDataAccount };