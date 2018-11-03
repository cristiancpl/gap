export class ItemBase {
  id: number;
  name: string;
  status: boolean;
}

export class JobTitle extends ItemBase {
  idArea: number;
}

export const AREA_DATA: ItemBase[] = [
  { id: 1, name: 'Services', status: true },
  { id: 2, name: 'Kitchen', status: true },
];

export const JOB_TITLE_DATA: JobTitle[] = [
  //Services
  { id: 1, idArea: 1, name: 'Manager', status: true },
  { id: 2, idArea: 1, name: 'Host', status: true },
  { id: 3, idArea: 1, name: 'Tuttofare', status: true },
  { id: 4, idArea: 1, name: 'Waitress', status: true },
  { id: 5, idArea: 1, name: 'Dining room manager', status: true },

  //Kitchen
  { id: 6, idArea: 2, name: 'Chef', status: true },
  { id: 7, idArea: 2, name: 'Sous chef', status: true },
  { id: 8, idArea: 2, name: 'Dishwasher', status: true },
  { id: 9, idArea: 2, name: 'Cook', status: true }
];
