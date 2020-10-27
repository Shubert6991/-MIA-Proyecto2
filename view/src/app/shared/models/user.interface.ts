export type Rol = 0|1;

export interface User {
  username: string;
  password: string;
}

export interface UserResponse {
  mensaje: string;
  token: string;
  userId: number;
  correo: string;
  nombre: string;
  apellido: string;
  nacimiento: string;
  pathProfilePic: string;
  credits: number;
  tipo: Rol;
  idPais: number; 
}