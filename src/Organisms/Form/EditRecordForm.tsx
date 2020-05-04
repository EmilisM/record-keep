import React, { ReactElement, useState } from 'react';
import { Formik, FormikErrors, Form, FormikHelpers } from 'formik';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import FormError from 'Atoms/Error/FormError';
import InputLabel from 'Atoms/Input/InputLabel';
import styled from 'styled-components/macro';
import Select from 'Molecules/Select/Select';
import { useQuery, useMutation } from 'react-query';
import { getRecordTypes } from 'API/RecordType';
import { SelectOption } from 'Types/Select';
import { getStyles } from 'API/Style';
import { getGenres } from 'API/Genre';
import { updateRecord as updateRecordAPI } from 'API/Record';
import GlobalFormError from 'Atoms/Error/GlobalFormError';
import moment from 'moment';
import { UpdateRecordModel, Record } from 'Types/Record';
import { toast } from 'react-toastify';
import FieldInput from 'Molecules/FieldInput';

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;

  margin: 20px 0;
`;

const InputLabelStyled = styled(InputLabel)`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const FieldInputStyled = styled(FieldInput)`
  width: 300px;
  margin-top: 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const ButtonStyled = styled(ButtonDashboard)`
  width: 300px;
  margin-top: 20px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const SelectStyled = styled(Select)`
  width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
  }

  border: 1px solid ${props => props.theme.colors.border.cardShadow};
  border-radius: 4px;
  margin-top: 10px;
`;

export interface UpdateRecordFields {
  artist: string;
  name: string;
  description?: string;
  recordType: SelectOption | null;
  genre: SelectOption | null;
  style: SelectOption[];
  label: string;
  year: string;
  form?: string;
}

const validate = (values: UpdateRecordFields): FormikErrors<UpdateRecordFields> => {
  const errors: FormikErrors<UpdateRecordFields> = {};

  if (!values.artist) {
    errors.artist = 'Artist is required';
  }

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.recordType) {
    errors.recordType = 'Record type is required';
  }

  if (!values.genre) {
    errors.genre = 'Genre is required';
  }

  if (!values.style && values.genre) {
    errors.style = 'Style is required';
  }

  if (!values.label) {
    errors.label = 'Label is required';
  }

  if (!values.year) {
    errors.year = 'Year is required';
  } else if (!values.year.match('^\\d{4}$')) {
    errors.year = 'Year is not in correct format';
  } else if (parseInt(values.year) > moment().year()) {
    errors.year = 'Year is in the future';
  }

  return errors;
};

type Props = {
  className?: string;
  recordsRefetch: () => Promise<Record[]>;
  record: Record;
};

const EditRecordForm = ({ className, recordsRefetch, record }: Props): ReactElement => {
  const { data: recordTypes } = useQuery('recordTypes', getRecordTypes);
  const { data: genres } = useQuery('genres', getGenres);

  const selectedGenre = record.recordStyles[0].style.genre;

  const [genreId, setGenreId] = useState<string>(selectedGenre.id.toString());
  const { data: styles } = useQuery(['styles', genreId], (key, gId) => getStyles(gId));

  const [updateRecord] = useMutation(updateRecordAPI);

  const recordTypeOptions = recordTypes
    ? recordTypes.map(rt => ({
        label: rt.name,
        value: rt.id.toString(),
      }))
    : [];

  const genreOptions = genres
    ? genres.map(g => ({
        label: g.name,
        value: g.id.toString(),
      }))
    : [];

  const styleOptions = styles
    ? styles.map(g => ({
        label: g.name,
        value: g.id.toString(),
      }))
    : [];

  const initialValues: UpdateRecordFields = {
    artist: record.artist,
    name: record.name,
    label: record.label,
    year: moment(record.year)
      .year()
      .toString(),
    recordType: { value: record.recordType.id.toString(), label: record.recordType.name },
    genre: { value: selectedGenre.id.toString(), label: selectedGenre.name },
    style: record.recordStyles.map(rs => ({ value: rs.style.id.toString(), label: rs.style.name })),
  };

  const onSubmit = (values: UpdateRecordFields, helpers: FormikHelpers<UpdateRecordFields>): void => {
    const { recordType } = values;
    if (!recordType) {
      return;
    }

    const updateRecordReq: UpdateRecordModel = {
      id: record.id,
      operations: [
        {
          op: 'add',
          path: '/artist',
          value: values.artist,
        },
        {
          op: 'add',
          path: '/name',
          value: values.name,
        },
        {
          op: 'add',
          path: '/label',
          value: values.label,
        },
        {
          op: 'add',
          path: '/description',
          value: values.description || null,
        },
        {
          op: 'add',
          path: '/year',
          value: moment()
            .utc()
            .startOf('year')
            .year(parseInt(values.year)),
        },
        {
          op: 'add',
          path: '/recordTypeId',
          value: recordType.value,
        },
        {
          op: 'add',
          path: '/styleIds',
          value: values.style.map(s => s.value),
        },
      ],
    };

    updateRecord(updateRecordReq)
      .then(() => recordsRefetch())
      .then(() => {
        helpers.setSubmitting(false);
        toast.success('Record update completed');
      });
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
      {({ isSubmitting, values, setFieldValue }) => (
        <FormStyled className={className}>
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Artist
          </InputLabelStyled>
          <FieldInputStyled name="artist" placeholder="Artist" />
          <FormError name="artist" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Name
          </InputLabelStyled>
          <FieldInputStyled name="name" placeholder="Name" />
          <FormError name="name" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Description
          </InputLabelStyled>
          <FieldInputStyled name="description" placeholder="Description" />
          <FormError name="description" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Label
          </InputLabelStyled>
          <FieldInputStyled name="label" placeholder="Label" />
          <FormError name="label" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Year
          </InputLabelStyled>
          <FieldInputStyled name="year" placeholder="Ex. 2008" />
          <FormError name="year" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Record type
          </InputLabelStyled>
          <SelectStyled
            placeholder="Record type"
            options={recordTypeOptions}
            onChange={option => setFieldValue('recordType', option)}
            value={values.recordType}
          />
          <FormError name="recordType" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Genre
          </InputLabelStyled>
          <SelectStyled
            placeholder="Genre"
            options={genreOptions}
            onChange={option => {
              setGenreId(option.value);
              setFieldValue('style', null);
              setFieldValue('genre', option);
            }}
            value={values.genre}
          />
          <FormError name="genre" />
          {values.genre && (
            <>
              <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
                Style or subgenre
              </InputLabelStyled>
              <SelectStyled
                placeholder="Style"
                options={values.genre ? styleOptions : []}
                onChange={options => setFieldValue('style', options)}
                value={values.style}
                isMulti
              />
              <FormError name="style" />
            </>
          )}
          <GlobalFormError />
          <ButtonStyled type="submit" fontWeight="light" disabled={isSubmitting}>
            Update record
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  );
};

export default EditRecordForm;
