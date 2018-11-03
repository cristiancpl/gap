import { Country } from "./countries.model";
import { ItemBase, JobTitle } from "./base.model";

export class Employee extends ItemBase {
  dob: Date;
  country: Country;
  username: string;
  hireDate: Date;
  area: ItemBase;
  jobTitle: JobTitle;
  tipRate: number;
  age: number;
}
