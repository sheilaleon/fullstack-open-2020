import express from 'express';

import patientsService from '../services/patients';
import { toNewPatient } from '../utils/utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(String(req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Undefined error';
    res.status(400).send(errorMessage);
  }
});

export default router;
