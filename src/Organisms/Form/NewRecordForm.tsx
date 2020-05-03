import React, { ReactElement, useState } from 'react';
import { Formik, FormikErrors, Form, FormikHelpers } from 'formik';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import FormError from 'Atoms/Error/FormError';
import InputLabel from 'Atoms/Input/InputLabel';
import styled from 'styled-components/macro';
import ImagePicker from 'Molecules/ImagePicker';
import { PercentCrop } from 'react-image-crop';
import FormInput from 'Atoms/Input/FormInput';
import Select from 'Molecules/Select/Select';
import { useQuery, useMutation } from 'react-query';
import { getRecordTypes } from 'API/RecordType';
import { SelectOption } from 'Types/Select';
import { getStyles } from 'API/Style';
import { getGenres } from 'API/Genre';
import { createImage as createImageAPI } from 'API/Image';
import { createRecord as createRecordAPI } from 'API/Record';
import GlobalFormError from 'Atoms/Error/GlobalFormError';
import moment from 'moment';

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

const FormInputStyled = styled(FormInput)`
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

const ImagePickerStyled = styled(ImagePicker)`
  margin-top: 10px;
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

export interface CreateRecordFields {
  artist: string;
  name: string;
  description?: string;
  crop: PercentCrop;
  image?: string;
  recordType: SelectOption | null;
  genre: SelectOption | null;
  style: SelectOption[];
  label: string;
  year: string;
  form?: string;
}

const validate = (values: CreateRecordFields): FormikErrors<CreateRecordFields> => {
  const errors: FormikErrors<CreateRecordFields> = {};

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
  collectionId: number;
  recordsRefetch: () => void;
  onRequestClose: () => void;
};

const NewRecordForm = ({ className, recordsRefetch, collectionId, onRequestClose }: Props): ReactElement => {
  const { data: recordTypes } = useQuery('recordTypes', getRecordTypes);
  const { data: genres } = useQuery('genres', getGenres);

  const [genreId, setGenreId] = useState<string>();
  const { data: styles } = useQuery(['styles', genreId], (key, gId) => getStyles(gId));
  const [createImage] = useMutation(createImageAPI);
  const [createRecord] = useMutation(createRecordAPI);

  const initialValues: CreateRecordFields = {
    artist: '',
    name: '',
    crop: { aspect: 1, x: 0, y: 0, height: 25, width: 25, unit: '%' },
    label: '',
    year: '',
    recordType: null,
    genre: null,
    style: [],
  };

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

  const onSubmit = (values: CreateRecordFields, helpers: FormikHelpers<CreateRecordFields>): void => {
    const { crop, image, artist, name, description, recordType, style, label, year } = values;

    if (!recordType) {
      return;
    }

    const styleIds = style.map(s => s.value);
    const yearDate = moment().year(parseInt(year));

    if (image) {
      const dataReq = {
        height: crop.height || 25,
        width: crop.width || 25,
        x: crop.x || 0,
        y: crop.y || 0,
        data: image.split(',')[1],
      };

      createImage({ ...dataReq })
        .then(image =>
          createRecord({
            artist,
            name,
            description,
            recordTypeId: recordType.value,
            collectionId: collectionId,
            imageId: image.id,
            styleIds,
            label,
            year: yearDate,
          }),
        )
        .then(() => {
          recordsRefetch();
          helpers.setSubmitting(false);
          onRequestClose();
        });
    } else {
      createRecord({
        artist,
        name,
        description,
        recordTypeId: recordType.value,
        collectionId: collectionId,
        styleIds,
        label,
        year: yearDate,
      }).then(() => {
        recordsRefetch();
        helpers.setSubmitting(false);
        onRequestClose();
      });
    }
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
      {({ isSubmitting, values, setFieldValue }) => (
        <FormStyled className={className}>
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Image
          </InputLabelStyled>
          <ImagePickerStyled
            onImageChange={image => setFieldValue('image', image)}
            onCropChange={(crop, percentageCrop) => setFieldValue('crop', percentageCrop)}
            crop={values.crop}
            image={values.image}
            onImageClear={() => setFieldValue('image', '')}
          >
            Choose an image
          </ImagePickerStyled>
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Artist
          </InputLabelStyled>
          <FormInputStyled name="artist" placeholder="Artist" />
          <FormError name="artist" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Name
          </InputLabelStyled>
          <FormInputStyled name="name" placeholder="Name" />
          <FormError name="name" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Description
          </InputLabelStyled>
          <FormInputStyled name="description" placeholder="Description" />
          <FormError name="description" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Label
          </InputLabelStyled>
          <FormInputStyled name="label" placeholder="Label" />
          <FormError name="label" />
          <InputLabelStyled color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            Year
          </InputLabelStyled>
          <FormInputStyled name="year" placeholder="Ex. 2008" />
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
            Create new record
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  );
};

export default NewRecordForm;
