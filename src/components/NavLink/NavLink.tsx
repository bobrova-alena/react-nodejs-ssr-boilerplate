import React from 'react';
import { NavLink as ReactNavLink, NavLinkProps } from 'react-router-dom';
import colors from 'src/theme/colors';
import styled from 'styled-components';

type LinkProps = {
  title: string;
  to: string;
};

const NavLinkElement = styled(ReactNavLink)<NavLinkProps>`
  height: 50px;
  line-height: 50px;
  font-family: 'Comfortaa', sans-serif;
  font-size: 18px;
  padding-left: 25px;
  padding-right: 25px;

  color: ${colors.floralWhite};
  opacity: 0.8;
  text-decoration: none;

  &:hover {
    color: ${colors.creamBrulee};
  }
`;

export function NavLink(props: LinkProps): JSX.Element {
  return (
    <NavLinkElement exact to={props.to}>
      {props.title}
    </NavLinkElement>
  );
}
