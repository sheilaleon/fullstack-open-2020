/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-plus-operands, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */

import {
  BaseEntry,
  Diagnosis,
  Entry,
  Gender,
  MaskedPatients,
  NewPatient,
  Patients,
} from '../types';

export const maskedPatient = ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
  entries,
}: Patients): MaskedPatients => {
  return { id, name, dateOfBirth, gender, occupation, entries };
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (label: string, data: any): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing string: ${label}`);
  }

  return data;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect (YYYY-MM-DD) or missing date`);
  }
  return date;
};

const isGender = (str: string): str is Gender => {
  return ['other', 'female', 'male'].includes(str);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(
      `Incorrect or missing gender: ${Object.values(Gender).join(' | ')}`,
    );
  }
  return gender;
};

const isBaseEntry = (entry: any): entry is BaseEntry => {
  if (!entry) {
    throw new Error(`No entry`);
  }

  if (entry.diagnosisCodes && !parseDiagnosis(entry.diagnosisCodes)) {
    throw new Error(`Incorrect Diagnosis Code`);
  }

  if (
    !isString(entry.id) ||
    !isString(entry.description) ||
    !isString(entry.data) ||
    !isString(entry.specialist)
  ) {
    throw new Error(
      `Incorrect entry for: id, description, date and/or specialist.`,
    );
  }
  return entry;
};

const parseEntry = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error('Entry(s) missing');
  }
  return entries.map((entry: any) => {
    if (!isBaseEntry(entry)) {
      throw new Error(`No Base Entry found`);
    }
    return entry;
  });
};

const parseDiagnosis = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  return diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode));
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString('ssn', object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation),
    entries: parseEntry(object.entries),
  };
};
