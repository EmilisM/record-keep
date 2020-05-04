import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';
import InputLabel from 'Atoms/Input/InputLabel';
import ImagePicker from 'Molecules/ImagePicker';
import { Formik, FormikHelpers } from 'formik';
import { ImageFormFields } from 'Types/Image';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;

  margin: 20px 0;
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

type Props = {
  className?: string;
  title: string;
  buttonLabel: string;
  inputLabel: string;
  onSubmit: (values: ImageFormFields, helpers: FormikHelpers<ImageFormFields>) => void;
};

const ImageForm = ({ className, title, buttonLabel, inputLabel, onSubmit }: Props): ReactElement => {
  const initialValues: ImageFormFields = {
    crop: { aspect: 1, x: 0, y: 0, height: 25, width: 25, unit: '%' },
    image: null,
  };

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <FormStyled className={className} onSubmit={handleSubmit}>
          <InputLabel color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            {title}
          </InputLabel>
          <ImagePickerStyled
            crop={values.crop}
            image={values.image}
            onImageChange={image => setFieldValue('image', image)}
            onCropChange={(crop, percentCrop) => setFieldValue('crop', percentCrop)}
            onImageClear={() => setFieldValue('image', null)}
          >
            {inputLabel}
          </ImagePickerStyled>
          <ButtonStyled type="submit" fontWeight="light" disabled={isSubmitting}>
            {buttonLabel}
          </ButtonStyled>
        </FormStyled>
      )}
    </Formik>
  );
};

export default ImageForm;
