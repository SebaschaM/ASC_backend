export interface Candidate {
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  avatar: string;
  cv: string;
}

export interface Company {
  email: string;
  password: string;
  sector_id: number;
  rubro: string;
  pais: string;
  departamento_id: number;
  provincia_id: number;
  sitio_web: string;
  razon_social: string;
  fechas_fundacion: string;
  ruc: string;
  telefono: string;
  movil: string;
  nombre_comercial: string;
  descripcion_empresa: string;
}
