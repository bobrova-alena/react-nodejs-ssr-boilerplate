import React from 'react';
import { CenterAligner, Text } from 'src/components';

import { AppTemplate } from '../../template';

export default function ContactsPage(): JSX.Element {
  return (
    <AppTemplate>
      <CenterAligner type='Both'>
        <Text>Contacts will be there</Text>
      </CenterAligner>
    </AppTemplate>
  );
}
