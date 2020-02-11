import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components/macro';

const HeadingBase = ({ level, className, children }: Props): ReactElement => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  return <Heading className={className}>{children}</Heading>;
};

const HeadingStyled = styled(HeadingBase)<Props>`
  font-family: ${props => props.theme.font.fontFamily.primary};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize}px;
  margin: 0;
`;

type Props = {
  className?: string;
  level: '1' | '2' | '3' | '4' | '5' | '6';
  fontWeight: '300' | '400' | '600' | '700';
  children: ReactNode;
  fontSize: number;
};

const Heading = ({ className, level, children, fontWeight, fontSize }: Props): ReactElement => (
  <HeadingStyled className={className} level={level} fontWeight={fontWeight} fontSize={fontSize}>
    {children}
  </HeadingStyled>
);

export default Heading;
