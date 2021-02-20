/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Gender, MaskedPatients, NewPatient, Patients } from '../types';

export const maskedPatient = ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}: Patients): MaskedPatients => {
  return { id, name, dateOfBirth, gender, occupation };
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
    throw new Error(`Incorrect (YYYY-MM-DD) or missing date: ${date}`);
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

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString('ssn', object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation),
  };
};
