import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import { CollectionMatchParams } from 'Types/Collection';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getRecords } from 'API/Record';
import { useQuery } from 'react-query';
import { RouteConfig } from 'Routes/RouteConfig';
import { isAxiosError } from 'Types/Error';
import Loader from 'Atoms/Loader/Loader';
import { getCollection, getCollections } from 'API/Collection';
import GenreProgressionCard from 'Molecules/Card/GenreProgressionCard';
import { getGenres } from 'API/Genre';
import { keyBy, mapValues, transform, mergeWith, countBy } from 'lodash';
import { GenreProgression, Genres } from 'Types/Genre';
import moment from 'moment';
import { isNumber } from 'util';
import { Record, RecordGenre } from 'Types/Record';
import CollectionCompositionCard from 'Molecules/Card/CollectionCompositionCard';
import CollectionSelectedCard from 'Molecules/Card/CollectionSelectedCard';
import { SelectOption } from 'Types/Select';

const AnalyzePage = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  grid-gap: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-gap: 10px;
    flex-direction: column;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    width: 100%;
  }
`;

const GenreProgressionCardStyled = styled(GenreProgressionCard)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
`;

type Props = RouteComponentProps<CollectionMatchParams>;

const Analyze = ({ match }: Props): ReactElement => {
  const { push } = useHistory();

  const onError = (err: unknown): void => {
    if (isAxiosError(err) && err.response?.status === 404) {
      push(RouteConfig.Dashboard.NotFound);
    }
  };

  const { data: collection, status: collectionStatus } = useQuery(
    ['collection', match.params.collectionId],
    (key, collectionId) => getCollection(collectionId),
    {
      onError: onError,
      retry: false,
    },
  );

  const { data: records, status: recordsStatus } = useQuery(
    ['records', match.params.collectionId],
    (key, collectionId) => getRecords(collectionId),
  );

  const { data: genres, status: genreStatus } = useQuery('genres', getGenres);

  const { data: collections, status: collectionsStatus } = useQuery('collections', () => getCollections());

  if (
    !records ||
    recordsStatus === 'loading' ||
    !collection ||
    collectionStatus === 'loading' ||
    !genres ||
    genreStatus === 'loading' ||
    !collections ||
    collectionsStatus === 'loading'
  ) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  const collectionsOptions = collections.map(c => ({
    label: c.name,
    value: c.id.toString(),
  }));

  const activeCollectionOption = {
    value: collection.id.toString(),
    label: collection.name,
  };

  const onChangeCollection = (option: SelectOption): void => {
    push(`${RouteConfig.Dashboard.Analysis.Root}/${option.value}`);
  };

  const sortedRecords = records.sort((one, two) => {
    const oneStamp = moment(one.creationDate);
    const twoStamp = moment(two.creationDate);

    if (oneStamp.isSame(twoStamp)) {
      return 0;
    } else if (oneStamp.isAfter(twoStamp)) {
      return 1;
    } else {
      return -1;
    }
  });

  const getGenreProgression = (): GenreProgression[] => {
    const allGenres = mapValues(
      keyBy(genres, g => g.name),
      () => 0,
    );

    const values = transform<Record, GenreProgression[]>(
      sortedRecords,
      (acc, r) => {
        const genreName = r.recordStyles[0].style.genre.name;
        const newItem: GenreProgression = {
          name: moment(r.creationDate).format('YYYY-MM-DD'),
          genres: {
            ...allGenres,
            [genreName]: 1,
          },
        };

        const foundIndex = acc.findIndex(f => f.name === newItem.name);

        if (foundIndex >= 0) {
          const res = mergeWith<GenreProgression, GenreProgression>(acc[foundIndex], newItem, (one, two) => {
            if (isNumber(one) && isNumber(two)) {
              return one + two;
            }
          });

          acc[foundIndex] = res;
        } else if (foundIndex < 0) {
          acc.push(newItem);
        }
      },
      [],
    );

    const result = values.map((v, i, arr) => {
      if (arr[i - 1]) {
        const genres = mergeWith<Genres, Genres>(v.genres, arr[i - 1].genres, (one, two) => {
          if (isNumber(one) && isNumber(two)) {
            return one + two;
          }
        });

        return {
          name: v.name,
          genres,
        };
      } else {
        return v;
      }
    });

    return result;
  };

  const getRecordGenres = (): RecordGenre[] | null => {
    if (!records || !genres) {
      return null;
    }

    const allGenres = genres.map<RecordGenre>(g => ({
      name: g.name,
      value: 0,
    }));

    const genreCounts = transform<number, RecordGenre[]>(
      countBy(records, r => r.recordStyles[0].style.genre.name),
      (i, j, k) => {
        const foundIndex = i.findIndex(f => f.name === k);
        if (foundIndex >= 0) {
          i[foundIndex] = {
            ...i[foundIndex],
            value: i[foundIndex].value + j,
          };
        } else if (foundIndex < 0) {
          i.push({
            name: k,
            value: j,
          });
        }
      },
      allGenres,
    );

    return genreCounts;
  };

  return (
    <AnalyzePage>
      <FirstColumn>
        <CollectionSelectedCard
          collections={collectionsOptions}
          onChangeCollection={onChangeCollection}
          value={activeCollectionOption}
        />
        <GenreProgressionCardStyled genreProgression={getGenreProgression()} />
      </FirstColumn>
      <SecondColumn>
        <CollectionCompositionCard genres={getRecordGenres()} />
      </SecondColumn>
    </AnalyzePage>
  );
};

export default Analyze;
