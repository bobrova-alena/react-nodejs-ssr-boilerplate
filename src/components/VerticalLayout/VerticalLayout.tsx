import React, { PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export function VerticalLayout(props: PropsWithChildren<ReactNode>): JSX.Element {
  return <Container>{props.children}</Container>;
}
