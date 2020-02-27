import React, { ReactElement, ChangeEvent } from 'react';
import styled, { DefaultTheme } from 'styled-components/macro';
import { FontSizes } from 'Types/Style';
import { RadioOptionType } from 'Types/Radio';

type Sizes = 'medium';
const fontSizes: FontSizes<Sizes> = {
  medium: {
    desktop: 22,
    tablet: 22,
    mobile: 22,
  },
};

type Props<T extends string> = StyledProps & {
  className?: string;
  onChange(e: ChangeEvent<HTMLInputElement>, value: RadioOptionType<T>): void;
  name: string;
  options: RadioOptionType<T>[];
  value: RadioOptionType<T>;
};

type StyledProps = {
  color?: keyof DefaultTheme['colors']['text'];
  hoverColor?: keyof DefaultTheme['colors']['text'];
  fontWeight?: keyof DefaultTheme['font']['fontWeight'];
  fontSize?: Sizes;
};

const InputStyled = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  margin: 0;
`;

const SpanLabel = styled.span`
  padding: 2px 20px 4px;

  border-radius: 6px;
  transition: padding 200ms ease, background-color 200ms ease, color 200ms ease;
`;

const LabelStyled = styled.label`
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Radio = styled.div<StyledProps>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.theme.font.fontWeight[props.fontWeight || 'regular']};
  font-size: ${props => fontSizes[props.fontSize || 'medium'].desktop}px;
  color: ${props => props.theme.colors.text[props.color || 'primaryLight']};

  @media ${props => props.theme.responsive.tablet} {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].tablet};
  }

  @media ${props => props.theme.responsive.mobile} {
    font-size: ${props => fontSizes[props.fontSize || 'medium'].mobile};
  }

  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  background-color: transparent;
  position: relative;

  user-select: none;
  cursor: pointer;

  
  ${LabelStyled} ${InputStyled}:checked ~ ${SpanLabel} {
    padding: 2px 40px 4px;
    background-color: ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.primaryDark};
  }

  ${LabelStyled}:hover ${InputStyled}:not(:checked) ~ ${SpanLabel} {
    color: ${props => props.theme.colors.text.primaryLight};
  }

  ${SpanLabel} {
    color: ${props => props.theme.colors.text.primaryLighter};
  }
`;

function RadioBase<T extends string>({
  className,
  onChange,
  name,
  options,
  value,
  fontWeight,
  fontSize,
  hoverColor,
  color,
}: Props<T>): ReactElement {
  return (
    <Radio className={className} fontWeight={fontWeight} fontSize={fontSize} hoverColor={hoverColor} color={color}>
      {options.map((option, index) => (
        <LabelStyled key={`${name}-${index}`}>
          <InputStyled type="radio" name={name} onChange={e => onChange(e, option)} checked={option === value} />
          <SpanLabel>{option.label}</SpanLabel>
        </LabelStyled>
      ))}
    </Radio>
  );
}

export default RadioBase;
