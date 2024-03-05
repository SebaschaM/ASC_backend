"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDefaultData = void 0;
const insertDefaultData = async (req, res) => {
    try {
        const defaultData = {
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
        return res.status(200).json({
            message: "Datos por defecto insertados",
            ok: true,
            status: 200,
            data: defaultData,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.insertDefaultData = insertDefaultData;
