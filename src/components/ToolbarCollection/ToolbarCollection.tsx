import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

import { CenterAligner } from '../CenterAligner';

const Container = styled.div`
  display: flex;
`;

export function ToolbarCollection(props: PropsWithChildren<ReactNode>): JSX.Element {
  return (
    <Container>
      {React.Children.map(props.children, (child: ReactNode, index: number) => (
        <CenterAligner key={index} type='Both'>
          {child}
        </CenterAligner>
      ))}
    </Container>
  );
}
