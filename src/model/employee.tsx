import { Department } from "./department";

export interface Employee {
  id: number,
  name: string,
  salary: number,
  department: Department["name"]
}