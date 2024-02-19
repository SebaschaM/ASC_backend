import { Request, Response } from "express";
import dbConnect from "../../database/db";

const getOffersData = async (req: Request, res: Response) => {
  try {
    const client = await dbConnect();
    const query = `SELECT * FROM oferta`;
    const response = await client?.query(query);
    console.log(response?.rows);

    client?.end();

    return res.status(200).json({
      message: "Success",
      data: response?.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { getOffersData };
