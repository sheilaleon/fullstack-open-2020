import diagnoses from '../../data/diagnoses.json';
import { Diagnosis, DiagnosisLatinFree } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosesLatinFree = (): DiagnosisLatinFree[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name,
  }));
};

export default {
  getDiagnoses,
  getDiagnosesLatinFree,
};