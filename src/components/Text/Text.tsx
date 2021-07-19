import React, { PropsWithChildren, ReactNode } from 'react';
import colors from 'src/theme/colors';
import styled from 'styled-components';

const Container = styled.div`
  color: ${colors.floralWhite};
  font-size: large;
`;

export function Text(props: PropsWithChildren<ReactNode>): JSX.Element {
  return <Container>{props.children}</Container>;
}
