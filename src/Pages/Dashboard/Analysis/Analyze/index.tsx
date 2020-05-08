import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import { CollectionMatchParams } from 'Types/Collection';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getRecords } from 'API/Record';
import { useQuery } from 'react-query';
import { RouteConfig } from 'Routes/RouteConfig';
import { isAxiosError } from 'Types/Error';
import Loader from 'Atoms/Loader/Loader';
import { getCollection } from 'API/Collection';
import GenreProgressionCard from 'Molecules/Card/GenreProgressionCard';
import { getGenres } from 'API/Genre';
import { keyBy, mapValues, transform, mergeWith } from 'lodash';
import { GenreProgression, Genres } from 'Types/Genre';
import moment from 'moment';
import { isNumber } from 'util';
import { Record } from 'Types/Record';

const AnalyzePage = styled.div``;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
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

  if (
    !records ||
    recordsStatus === 'loading' ||
    !collection ||
    collectionStatus === 'loading' ||
    !genres ||
    genreStatus === 'loading'
  ) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

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

  return (
    <AnalyzePage>
      <GenreProgressionCard genreProgression={getGenreProgression()} />
    </AnalyzePage>
  );
};

export default Analyze;
