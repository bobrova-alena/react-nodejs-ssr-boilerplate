import React, { PropsWithChildren, ReactNode } from 'react';
import { Toolbar, VerticalLayout, ToolbarCollection, Button, NavLink } from 'src/components';
import colors from 'src/theme/colors';
import styled from 'styled-components';

import { GlobalStyle } from './globalStyle';

const Container = styled.div`
  background-image: linear-gradient(to bottom right, ${colors.bakersChocolate}, ${colors.cocoaBrown}, ${colors.lightBakersChocolate});
  height: 100%;
`;

export function AppTemplate(props: PropsWithChildren<ReactNode>): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Container>
        <VerticalLayout>
          <Toolbar>
            <ToolbarCollection>
              <NavLink title='Home' to='/home' />
              <NavLink title='Schedule' to='/schedule' />
              <NavLink title='Contacts' to='/contacts' />
            </ToolbarCollection>
            <Button title='Do Something' variant='filled' />
          </Toolbar>
          {props.children}
        </VerticalLayout>
      </Container>
    </>
  );
}
