import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Aligment = 'Horizontal' | 'Vertical' | 'Both';

type CenterAlignerProps = {
  children: ReactNode;
  type: Aligment;
};

interface HTMLProps extends React.HTMLAttributes<HTMLElement> {
  type: Aligment;
}

const Container = styled.div<HTMLProps>`
  display: flex;
  flex-direction: column;
  height:  ${props => (props.type == 'Vertical' || props.type == 'Both' ? '100%' : 'unset')};
`;

const ItemWrapper = styled.div<HTMLProps>`
  margin-left: ${props => (props.type == 'Horizontal' || props.type == 'Both' ? 'auto' : 'unset')};
  margin-right: ${props => (props.type == 'Horizontal' || props.type == 'Both' ? 'auto' : 'unset')};
  margin-top: ${props => (props.type == 'Vertical' || props.type == 'Both' ? 'auto' : 'unset')};
  margin-bottom: ${props => (props.type == 'Vertical' || props.type == 'Both' ? 'auto' : 'unset')};
`;

export function CenterAligner(props: CenterAlignerProps): JSX.Element {
  return (
    <Container type={props.type}>
      <ItemWrapper type={props.type}>{props.children}</ItemWrapper>
    </Container>
  );
}
