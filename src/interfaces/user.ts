
export interface Candidate {
  postulante_id: string,
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  avatar: string;
  cv: string;
  created_at: string;
}

export interface Company {
  empresa_id: number;
  empresa_informacion_id?: number;
  sector_id: number;
  rubro: number;
  nombre_completo: string;
  pais: string;
  departamento_id: number;
  provincia_id: number;
  direccion: string;
  email: string;
  password: string;
  sitio_web: string;
  email_code: string;
  active: boolean;
  account_confirm: boolean;
  avatar: string;
  created_at: string;
  companyInformation: CompanyInformation;
}

export interface CompanyInformation {
  empresa_informacion_id: number;
  razon_social: string;
  nombre_comercial: string;
  fecha_fundacion: string;
  ruc: string;
  telefono: string;
  movil: string;
  descripcion_empresa: string;
}
