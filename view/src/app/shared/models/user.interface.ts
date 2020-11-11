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

export interface userInfo{
  uid: number;
  name: string;
  lastname: string;
  country: number;
  date: string;
}

export interface ProfilePic {
  uid: number;
  email: string;
  image: string;
}

export interface Categoria {
  id: number;
  name: string;
}

export interface SendCategoria {
  nombre: string;
}

export interface Product{
  nombre: string;
  description: string;
  claves: string;
  precio: number;
  cantidad: number;
  categoria: number;
  picture: string;
  idUsuario: number;
  correo: string;
  pais: number;
}

export interface ResponseProducts{

}

export interface DetalleProducto{

}

export interface ResponsePclave{
  id:number;
  palabra: string;
}