export interface Courses {
  id: number;
  name: string;
  description: string;
}
export interface CreateCoursesData {
  name: string;
  description:string;
}

export interface UpdateCoursesData {
  name?: string|null;
  description?: string;
}

