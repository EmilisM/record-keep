import React, { ReactElement } from 'react';
import Card from 'Atoms/Card/Card';
import styled from 'styled-components/macro';
import H from 'Atoms/Text/H';
import { ReactComponent as Star } from 'Assets/Star.svg';

const CardStyled = styled(Card)`
  background-color: ${props => props.theme.colors.background.secondaryDarker};
  padding: 20px;

  display: flex;
  align-items: center;

  width: 100%;
`;

const StarStyled = styled(Star)`
  width: 30px;
  height: 30px;

  &:not(:last-child) {
    margin-left: 5px;
  }

  fill: ${props => props.theme.colors.text.primaryLight};

  cursor: pointer;
`;

const StarContainer = styled.div`
  margin-left: auto;
  direction: rtl;

  & > .star-selected {
    fill: ${props => props.theme.colors.special.starSelected};
  }

  & > .star:hover,
  & > .star:hover ~ .star {
    fill: ${props => props.theme.colors.special.starSelected};
  }
`;

type Props = {
  className?: string;
  onChange: (rating: number) => void;
  rating: number;
};

const RecordRatingCard = ({ className, onChange, rating }: Props): ReactElement => {
  const ratingArray = [5, 4, 3, 2, 1];

  return (
    <CardStyled className={className}>
      <H fontWeight="semiBold" level="2" color="primaryLight" fontSize="normal">
        Record rating
      </H>
      <StarContainer>
        {ratingArray.map(localRating => (
          <StarStyled
            key={localRating}
            className={`star ${localRating <= rating ? 'star-selected' : ''}`}
            onClick={() => onChange(localRating)}
          />
        ))}
      </StarContainer>
    </CardStyled>
  );
};

export default RecordRatingCard;
