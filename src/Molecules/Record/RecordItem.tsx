import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import Image from 'Atoms/Image';
import Link from 'Atoms/Link/Link';
import { ReactComponent as Arrow } from 'Assets/Arrow.svg';
import ActionMenu from 'Organisms/ActionMenu';
import { ActionMenuOption } from 'Types/ActionMenu';
import { getDefaultResourceImage } from 'Services/image';
import { Record } from 'Types/Record';
import Span from 'Atoms/Text/Span';
import P from 'Atoms/Text/P';
import moment from 'moment';

const RecordItemStyled = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 6px 20px;
  background: ${props => props.theme.colors.background.primary};
  border-radius: 4px;
  box-shadow: 0px 1px 2px 0 ${props => props.theme.colors.border.cardShadow};

  &:hover {
    background-color: ${props => props.theme.colors.background.primaryDarker};
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    padding: 10px 15px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 10px;
  }

  transition: 300ms opacity ease;
`;

const ArrowStyled = styled(Arrow)`
  width: 40px;
  height: 40px;

  fill: ${props => props.theme.colors.text.primaryDarker};
  transition: 300ms opacity ease;
  margin-left: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
`;

const ImageStyled = styled(Image)`
  width: 80px;
  height: 80px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 48px;
    height: 48px;
  }
`;

const ActionMenuStyled = styled(ActionMenu)`
  margin: 0 0 0 auto;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export type Props = {
  className?: string;
  to: string;
  accountMenuOptions: ActionMenuOption[];
  accountMenuOnChange: (option: ActionMenuOption) => void;
  record: Record;
};

const RecordItem = ({ className, to, accountMenuOptions, accountMenuOnChange, record }: Props): ReactElement => {
  return (
    <RecordItemStyled className={className} to={to}>
      <ImageStyled className="record-item__image" src={getDefaultResourceImage(record.image?.data)} />
      <TitleContainer>
        <RowContainer>
          <P>
            <Span color="primaryDarker" fontSize="regular" fontWeight="regular">
              {record.artist}
            </Span>
            <Span color="primaryDarker" fontSize="regular" fontWeight="regular">
              {' - '}
            </Span>
            <Span color="primaryDarker" fontSize="regular" fontWeight="semiBold">
              {record.name}
            </Span>
          </P>
        </RowContainer>
        <RowContainer>
          <P>
            <Span color="primaryDarker" fontSize="regular" fontWeight="light">
              {moment(record.year).format('YYYY')}
            </Span>
            <Span color="primaryDarker" fontSize="regular" fontWeight="light">
              {' - '}
            </Span>
            <Span color="primaryDarker" fontSize="regular" fontWeight="light">
              {record.recordType.name}
            </Span>
          </P>
        </RowContainer>
      </TitleContainer>
      <ActionMenuStyled options={accountMenuOptions} onChange={accountMenuOnChange} />
      <ArrowStyled />
    </RecordItemStyled>
  );
};

export default RecordItem;
