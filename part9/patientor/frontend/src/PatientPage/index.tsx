import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );

        dispatch({ type: 'SET_PATIENT_DETAILS', payload: patientDetails });
      } catch (error) {
        console.error(error.response.data);
        setError(error.response.data.error);
      }
    };

    if (patient?.id !== id || !patient) {
      getPatientDetails();
    }
  }, [id, patient, dispatch]);

  const genderIcon = () => {
    if (patient?.gender === 'male') {
      return <Icon name="mars" />;
    } else if (patient?.gender === 'female') {
      return <Icon name="venus" />;
    } else if (patient?.gender === 'other') {
      return <Icon name="question" />;
    }
    return 'null';
  };

  console.log('genderIcon() :>> ', genderIcon());
  return (
    <div>
      <h3>
        {patient?.name} {genderIcon()}
      </h3>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </div>
  );
};

export default PatientPage;
