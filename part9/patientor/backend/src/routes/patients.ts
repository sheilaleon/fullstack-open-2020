import express from 'express';

import patientsService from '../services/patients';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getMaskedPatients());
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  res.json(newPatient);
});
export default router;
