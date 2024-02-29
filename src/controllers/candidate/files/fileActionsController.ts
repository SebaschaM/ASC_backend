import { Request, Response } from "express";
import { uploadToGCS } from "../../../utils/libs/gcloudStClient";

const uploadFileController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No se ha recibido ningún archivo");
  }

  try {
    await uploadToGCS(req.file);
    res.send({ message: "CV SUBIDO CON ÉXITO" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir el archivo");
  }
};

export { uploadFileController };
