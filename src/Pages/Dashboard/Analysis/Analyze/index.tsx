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
import { keyBy, mapValues, transform, mergeWith, countBy, map } from 'lodash';
import { GenreProgression, Genres } from 'Types/Genre';
import moment from 'moment';
import { isNumber } from 'Types/General';
import { Record, RecordGenre, RecordProgression } from 'Types/Record';
import CollectionCompositionCard from 'Molecules/Card/CollectionCompositionCard';
import CollectionSelectedCard from 'Molecules/Card/CollectionSelectedCard';
import { SelectOption } from 'Types/Select';
import CollectionRecordProgression from 'Molecules/Card/CollectionRecordProgressionCard';
import CollectionRecordFormatCard from 'Molecules/Card/CollectionRecordFormatCard';
import { RecordFormatComposition } from 'Types/RecordFormat';
import { getRecordFormats } from 'API/RecordFormat';
import CollectionRecordTypeCard from 'Molecules/Card/CollectionRecordTypeCard';
import { RecordTypeProgression, RecordTypes } from 'Types/RecordType';
import { getRecordTypes } from 'API/RecordType';

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

const CollectionRecordProgressionStyled = styled(CollectionRecordProgression)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
`;

const CollectionRecordFormatCardStyled = styled(CollectionRecordFormatCard)`
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    margin-top: 10px;
  }
`;

const CollectionRecordTypeCardStyled = styled(CollectionRecordTypeCard)`
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
  const { data: recordFormats, status: recordFormatsStatus } = useQuery('recordFormats', getRecordFormats);
  const { data: recordTypes, status: recordTypesStatus } = useQuery('recordTypes', getRecordTypes);

  const { data: collections, status: collectionsStatus } = useQuery('collections', () => getCollections());

  if (
    !records ||
    recordsStatus === 'loading' ||
    !collection ||
    collectionStatus === 'loading' ||
    !genres ||
    genreStatus === 'loading' ||
    !collections ||
    collectionsStatus === 'loading' ||
    !recordFormats ||
    recordFormatsStatus === 'loading' ||
    !recordTypes ||
    recordTypesStatus === 'loading'
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
        const genreName = r.recordStyle[0].style.genre.name;
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
    const allGenres = genres.map<RecordGenre>(g => ({
      name: g.name,
      value: 0,
    }));

    const genreCounts = transform<number, RecordGenre[]>(
      countBy(records, r => r.recordStyle[0].style.genre.name),
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

  const getRecordProgression = (): RecordProgression[] => {
    const recordByTime: RecordProgression[] = map(
      countBy(sortedRecords, r => r.creationDate),
      (k, v) => ({
        name: moment(v).format('YYYY-MM-DD'),
        value: k,
      }),
    );

    const recordResult = recordByTime.map((v, i, arr) => {
      if (arr[i - 1]) {
        const progression = mergeWith<RecordProgression, RecordProgression>(v, arr[i - 1], (one, two) => {
          if (isNumber(one) && isNumber(two)) {
            return one + two;
          }
        });

        return progression;
      } else {
        return v;
      }
    });

    return recordResult;
  };

  const getRecordFormatComposition = (): RecordFormatComposition[] => {
    const allFormats = recordFormats.map<RecordFormatComposition>(g => ({
      name: g.name,
      value: 0,
    }));

    const recordFormatComposition: RecordFormatComposition[] = transform(
      countBy(sortedRecords, r => r.recordFormat.name),
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
      allFormats,
    );

    return recordFormatComposition;
  };

  const getRecordTypeProgression = (): RecordTypeProgression[] => {
    const allRecordTypes = mapValues(
      keyBy(recordTypes, g => g.name),
      () => 0,
    );

    const values = transform<Record, RecordTypeProgression[]>(
      sortedRecords,
      (acc, r) => {
        const newItem: RecordTypeProgression = {
          name: moment(r.creationDate).format('YYYY-MM-DD'),
          recordTypes: {
            ...allRecordTypes,
            [r.recordType.name]: 1,
          },
        };

        const foundIndex = acc.findIndex(f => f.name === newItem.name);

        if (foundIndex >= 0) {
          const res = mergeWith<RecordTypeProgression, RecordTypeProgression>(acc[foundIndex], newItem, (one, two) => {
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
        const recordTypes = mergeWith<RecordTypes, RecordTypes>(v.recordTypes, arr[i - 1].recordTypes, (one, two) => {
          if (isNumber(one) && isNumber(two)) {
            return one + two;
          }
        });

        return {
          name: v.name,
          recordTypes,
        };
      } else {
        return v;
      }
    });

    return result;
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
        <CollectionRecordTypeCardStyled recordTypeProgression={getRecordTypeProgression()} />
      </FirstColumn>
      <SecondColumn>
        <CollectionCompositionCard genres={getRecordGenres()} />
        <CollectionRecordFormatCardStyled recordFormatComposition={getRecordFormatComposition()} />
        <CollectionRecordProgressionStyled recordProgression={getRecordProgression()} />
      </SecondColumn>
    </AnalyzePage>
  );
};

export default Analyze;
