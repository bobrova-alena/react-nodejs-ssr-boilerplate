import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

import { CenterAligner } from '../CenterAligner';
import { ToolbarCollection } from '../ToolbarCollection';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 20px;
`;

export function Toolbar(
  props: PropsWithChildren<typeof ToolbarCollection | ReactNode>
): JSX.Element {
  return (
    <Container>
      {React.Children.map(
        props.children,
        (child: typeof ToolbarCollection | ReactNode, index: number) => {
          return (child as ReactNode) ? (
            <CenterAligner key={index} type='Both'>
              {child}
            </CenterAligner>
          ) : (
            <div key={index}>child</div>
          );
        }
      )}
    </Container>
  );
}
