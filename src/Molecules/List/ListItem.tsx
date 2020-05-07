import React, { ReactElement, FC, ReactNode } from 'react';
import styled from 'styled-components/macro';
import P from 'Atoms/Text/P';
import Image from 'Atoms/Image';
import { useHistory } from 'react-router-dom';

const ListItemStyled = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 100%;
  height: 48px;
  padding: 5px 20px;

  &:not(:first-child) {
    border: solid ${props => props.theme.colors.border.cardShadow};
    border-width: 1px 0 0 0;
  }

  &:hover {
    background-color: ${props => props.theme.colors.background.primaryDarker};
  }

  &[data-clickable='true'] {
    cursor: pointer;
  }

  & > svg {
    width: 30px;
    height: 30px;

    fill: ${props => props.theme.colors.text.primaryDarker};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  width: 100%;
`;

const PStyled = styled(P)`
  margin: 0 0 0 auto;
`;

const ImageStyled = styled(Image)`
  width: 30px;
  height: 30px;
`;

export type Props = {
  className?: string;
  children?: ReactNode;
  image?: string;
  Icon: FC;
  time: string;
  to?: string;
};

const ListItem = ({ className, Icon, children, time, image, to }: Props): ReactElement => {
  const { push } = useHistory();

  return (
    <ListItemStyled className={className} onClick={() => to && push(to)} data-clickable={!!to}>
      {image ? <ImageStyled src={`data:image;base64,${image}`} /> : <Icon />}
      <ContentContainer>
        <P color="primaryDarker" fontSize="normal" fontWeight="semiBold">
          {children}
        </P>
        <PStyled color="primaryDarker" fontSize="normal">
          {time}
        </PStyled>
      </ContentContainer>
    </ListItemStyled>
  );
};

export default ListItem;
