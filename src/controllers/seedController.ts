import { Request, Response } from "express";
import { HeaderSection } from "../interfaces/headerSection";

const insertDefaultData = async (req: Request, res: Response) => {
  try {
    const defaultData: HeaderSection = {
      title: "¡Aquí encontraras el empleo que buscabas!",
      buttonSection: [
        {
          text: "Ver ofertas",
          link: "/ofertas",
        },
        {
          text: "Publicar oferta",
          link: "/publicar",
        },
      ],
      offerSection: [
        {
          areaOffer: "Desarrollo",
          link: "/ofertas/desarrollo",
        },
        {
          areaOffer: "Diseño",
          link: "/ofertas/diseño",
        },
        {
          areaOffer: "Mercadotecnia",
          link: "/ofertas/mercadotecnia",
        },
        {
          areaOffer: "Ventas",
          link: "/ofertas/ventas",
        },
      ],
    };

    return res.status(200).json(defaultData)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { insertDefaultData };
