import { Request, Response } from "express";
import dbConnect from "../../../database/db";

const getEducationInfo = async (req: Request, res: Response) => {
    const { postulanteId } = req.body;
    
    try {
        const db = await dbConnect();
        const query = `
                SELECT *
                FROM postulante_educacion
                WHERE postulante_id = $1
            `;
    
        if (!db) {
        res.status(500).json({ error: "Error en la base de datos" });
        return;
        }
    
        const data = await db?.query(query, [postulanteId]);
    
        res.status(200).json({
        data: data?.rows[0],
        ok: true,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
    }

const updateEducationInfo = async (req: Request, res: Response) => {

    const { postulanteId, institucion, titulo, fechaInicio, fechaFin, descripcion } =
        req.body;
    
    try {
        const db = await dbConnect();
        const query = `
                    UPDATE postulante_educacion
                    SET 
                        institucion = $1,
                        titulo = $2,
                        fecha_inicio = $3,
                        fecha_fin = $4,
                        descripcion = $5
                    WHERE postulante_id = $6
                `;
    
        if (!db) {
        res.status(500).json({ error: "Error en la base de datos" });
        return;
        }
    
        await db?.query(query, [
        institucion,
        titulo,
        fechaInicio,
        fechaFin,
        descripcion,
        postulanteId,
        ]);
    
        res.status(200).json({ ok: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

