/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from '../types';

let savedPatients = [...patients];

const findById = (id: string): Patient | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const patient = savedPatients.find((patient) => patient.id === id);
  return patient;
};

const getPatients = (): PublicPatient[] => {
  return savedPatients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return { id, name, dateOfBirth, gender, occupation, entries };
    },
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuidv4(), entries: [] as Entry[] };
  savedPatients = savedPatients.concat(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = {
    ...newEntry,
    id: uuidv4(),
  };
  patient.entries.push(entry);

  return patient;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry,
};
