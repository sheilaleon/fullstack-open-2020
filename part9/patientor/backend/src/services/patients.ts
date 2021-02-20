import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients.json';
import { Patients, MaskedPatients, NewPatient } from '../types';

const getPatients = (): Patients[] => {
  return patients;
};

const getMaskedPatients = (): MaskedPatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patients => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getMaskedPatients,
  addPatient,
};
