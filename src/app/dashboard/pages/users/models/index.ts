export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
  role:'ADMINISTRADOR'|'USUARIO';
  courseId:number;
}

export interface CreateUserData {
  name: string;
  surname: string;
  email: string;
  password: string;
  role:string;
}

export interface UpdateUserData {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?:string;
  token?:string;
}
