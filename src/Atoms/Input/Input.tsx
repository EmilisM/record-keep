import React, { ReactElement, ChangeEvent, KeyboardEvent, RefObject } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'medium' | 'normal';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 20,
    tablet: 20,
    mobile: 20,
  },
  normal: {
    desktop: 20,
    tablet: 18,
    mobile: 16,
  },
};

type Props = {
  className?: string;
  name?: string;
  id?: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  value?: string;
  placeholder?: string;
  fontSize?: Sizes;
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  color?: keyof DefaultTheme['colors']['text'];
  type?: string;
  inputRef?: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  accept?: string;
};

const InputBase = ({
  className,
  name,
  onChange,
  value,
  placeholder,
  id,
  type,
  inputRef,
  autoFocus,
  onKeyPress,
  required,
  accept,
}: Props): ReactElement => (
  <input
    type={type}
    className={className}
    name={name}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    id={id}
    ref={inputRef}
    autoFocus={autoFocus}
    onKeyPress={onKeyPress}
    required={required}
    accept={accept}
  />
);

const Input = styled(InputBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.primary};
  padding: 6px 10px;
  background-color: transparent;

  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile}px;
  }
`;

export default Input;
