import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { Patients, PublicPatient, NewPatient } from '../types';

const savedPatients = [...patients];

const findById = (id: string): Patients | unknown => {
  const patient = savedPatients.find((patient) => patient.id === id);
  return patient;
};

const getPatients = (): PublicPatient[] => {
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
  addPatient,
  findById,
};
