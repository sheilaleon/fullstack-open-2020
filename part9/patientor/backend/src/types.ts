export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
/* prettier-ignore */
export interface Entry {
}
/* prettier-enable */
/* eslint-enable @typescript-eslint/no-empty-interface */
export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type MaskedPatients = Omit<Patients, 'ssn'>;
export type PublicPatient = Omit<Patients, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patients, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
