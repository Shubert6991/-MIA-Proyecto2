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

export interface Pais{
  id: number;
  nombre:string;
}

export interface RegistroUsuario {
  name: string;
  lastname: string;
  email: string;
  password: string;
  date: string;
  country: string;
  picture: string;
}

export interface RegistroResponse{
  mensaje: string;
}

export interface UMail{
  email: string;
}

export interface imagePath{
  path: string;
}

export interface ProfilePic{
  image: string;
}