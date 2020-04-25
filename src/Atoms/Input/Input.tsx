import React, { ReactElement, ChangeEvent, KeyboardEvent, RefObject, FocusEvent } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';

type Sizes = 'normal';
const fontSizes: FontSizes<Sizes> = {
  normal: {
    desktop: 20,
    tablet: 18,
    mobile: 16,
  },
};

export type Props = {
  className?: string;
  id?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
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
  onBlur,
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
    onBlur={onBlur}
  />
);

const Input = styled(InputBase)`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'normal'].desktop}px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.primary};
  padding: 6px 10px;
  background-color: transparent;

  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};

  @media ((min-width: ${props => props.theme.breakpoints.mobile}) and (max-width: ${props =>
  props.theme.breakpoints.desktop})) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].tablet}px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => fontSizes[props.fontSize || 'normal'].mobile}px;
  }
`;

export default Input;
