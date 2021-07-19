import React from 'react';
import { CenterAligner, Text } from 'src/components';

import { AppTemplate } from '../../template';

export default function SchedulePage(): JSX.Element {
  return (
    <AppTemplate>
      <CenterAligner type='Both'>
        <Text>A schedule will be there</Text>
      </CenterAligner>
    </AppTemplate>
  );
}
