import patients from '../../data/patients.json';
import { Patients ,PatientsPII } from '../types';

const getPatients = (): Patients[] => {
  return patients;
};

const getPatientsPII = (): PatientsPII[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getPatientsPII,
};