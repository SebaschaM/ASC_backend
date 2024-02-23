import { Request, Response } from "express";
import dbConnect from "../../database/db";

const getLocationsGeo = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();
    const query = `
    select 
        c.distrito_id as Ubigeo,
        --a.departamento_id,
        a.nombre_departamento, 
        --b.provincia_id,
        b.nombre_provincia,
        c.nombre_distrito
    from departamento a
    left join provincia b 
        ON a.departamento_id = b.departamento_id
    left join distrito c
        ON b.provincia_id = c.provincia_id
    `;
    const response = await client?.query(query);
    //console.log(response?.rows);

    client?.end();

    return res.status(200).json({
      message: "Success",
      ok: true,
      status: 200,
      data: response?.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { getLocationsGeo };
