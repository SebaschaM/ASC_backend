"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationsGeo = void 0;
const db_1 = __importDefault(require("../../database/db"));
const getLocationsGeo = async (_req, res) => {
    try {
        const client = await (0, db_1.default)();
        const query = `
    select 
        c.distrito_id as Ubigeo,
        a.departamento_id,
        a.nombre_departamento, 
        b.provincia_id,
        b.nombre_provincia,
        c.nombre_distrito
    from departamento a
    left join provincia b 
        ON a.departamento_id = b.departamento_id
    left join distrito c
        ON b.provincia_id = c.provincia_id`;
        const response = await (client === null || client === void 0 ? void 0 : client.query(query));
        //console.log(response?.rows);
        const data = response === null || response === void 0 ? void 0 : response.rows.reduce((acc, { ubigeo, departamento_id, nombre_departamento, nombre_provincia, nombre_distrito, provincia_id }) => {
            let departamento = acc.find((dep) => dep.nombre_departamento === nombre_departamento);
            if (!departamento) {
                departamento = {
                    departamento_id,
                    nombre_departamento,
                    provincias: [],
                };
                acc.push(departamento);
            }
            let provincia = departamento.provincias.find((prov) => prov.nombre_provincia === nombre_provincia);
            if (!provincia) {
                provincia = { provincia_id, nombre_provincia, distritos: [] };
                departamento.provincias.push(provincia);
            }
            provincia.distritos.push({ ubigeo, nombre_distrito });
            return acc;
        }, []);
        client === null || client === void 0 ? void 0 : client.end();
        return res.status(200).json({
            message: "Success",
            ok: true,
            status: 200,
            data: data,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getLocationsGeo = getLocationsGeo;
