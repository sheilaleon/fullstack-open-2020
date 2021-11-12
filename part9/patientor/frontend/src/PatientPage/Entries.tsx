import React from 'react';

import { Entry } from '../types';

const HospitalEntries: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>Specialist: {entry.specialist}</p>
      <p>{entry.diagnosisCodes}</p>
    </div>
  );
};

export default { HospitalEntries };
