import { Request, Response } from "express";
import { uploadToGCS } from "../../../utils/storageService";
import dbConnect from "../../../database/db";

const uploadFileController = async (req: Request, res: Response) => {
  const { postulanteId } = req.body;

  if (!req.file) {
    return res.status(400).send("No se ha recibido ningún archivo");
  }

  try {
    const db = await dbConnect();
    const newNameFile = await uploadToGCS(req.file);
    const url_public = `https://storage.googleapis.com/pruebaa-bucket-asc/${newNameFile}`;

    const query = `UPDATE postulante SET cv = $1 WHERE postulante_id = $2`;
    await db?.query(query, [url_public, postulanteId]);

    res.send({
      status: 200,
      message: "Archivo subido correctamente",
      url_public,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir el archivo");
  }
};

const deleteFile = async (req: Request, res: Response) => {
  const { postulanteId } = req.body;

  try {
    const db = await dbConnect();
    const query = `UPDATE postulante SET cv = null WHERE postulante_id = $1`;
    await db?.query(query, [postulanteId]);

    res.send({
      status: 200,
      message: "Archivo eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el archivo");
  }
};

export { uploadFileController, deleteFile };
