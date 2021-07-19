import React from 'react';
import { IRandomService } from 'src/services';
import colors from 'src/theme/colors';
import styled from 'styled-components';

import { Button } from '../Button';
import { CenterAligner } from '../CenterAligner';

type NumericPanelProps = {
  service: IRandomService;
  number: number;
};

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Number = styled.div`
  padding-right: 15px;
  font-size: 20px;
  color: ${colors.floralWhite};
`;

export function NumericPanel(props: NumericPanelProps): JSX.Element {
  return (
    <Container>
      <NumberContainer>
        <CenterAligner type='Both'>
          <Number>{props.number}</Number>
        </CenterAligner>
      </NumberContainer>
      <Button
        title='Update'
        variant='outlined'
        onClick={(): void => props.service.update()}></Button>
    </Container>
  );
}
