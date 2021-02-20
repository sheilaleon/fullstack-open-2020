export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnosisLatinFree = Omit<Diagnosis, 'latin'>;