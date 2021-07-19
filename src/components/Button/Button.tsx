import React from 'react';
import colors from 'src/theme/colors';
import styled, { css } from 'styled-components';

type ButtonStyle = 'filled' | 'outlined';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: ButtonStyle;
  onClick?: () => void;
}

const ButtonElement = styled.button<ButtonProps>`
  height: 50px;
  line-height: 50px;
  font-family: 'Comfortaa', sans-serif;
  font-size: 18px;
  padding-left: 25px;
  padding-right: 25px;
  min-width: max-content;

  &:hover {
    cursor: pointer;
  }

  ${props => {
    switch (props.variant) {
      case 'filled':
        return filledButtonCss;
      default:
        return outlinedButtonCss;
    }
  }}
`;

const filledButtonCss = css`
  background-image: linear-gradient(to bottom right, ${colors.orangeRed}, ${colors.carrotOrange});
  color: ${colors.white};
  opacity: 0.95;
  border: none;
  background-color: unset;
  border-radius: 2px;

  &:hover {
    background-image: linear-gradient(to bottom right, ${colors.harleyDavidsonOrange}, ${colors.goldDrop});
  }
`;

const outlinedButtonCss = css`
  border: solid 2px ${colors.floralWhite};
  color: ${colors.floralWhite};
  background-color: unset;
  border-radius: 20px;
`;

export function Button(props: ButtonProps): JSX.Element {
  return (
    <ButtonElement
      variant={props.variant}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
      }}>
      {props.title}
    </ButtonElement>
  );
}
