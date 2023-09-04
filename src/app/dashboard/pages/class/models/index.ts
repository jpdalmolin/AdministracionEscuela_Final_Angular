export interface Clase {
  id: number;
  name: string;
  description: string;

}

export interface CreateClassData {
  name: string;
  description: string;
}

export interface UpdateClassData {
  name?: string;
  description?: string;
}
