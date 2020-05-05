import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import ImagePicker from 'Molecules/ImagePicker';
import { Formik, FormikHelpers, FormikErrors } from 'formik';
import { ImageFormFields } from 'Types/Image';
import Form from 'Atoms/Form/Form';
import FormError from 'Atoms/Error/FormError';
import ButtonDashboard from 'Atoms/Button/ButtonDashboard';

const ImagePickerStyled = styled(ImagePicker)`
  margin-top: 10px;
`;

const FormErrorStyled = styled(FormError)`
  margin-top: 10px;
`;

const FormButtonStyled = styled(ButtonDashboard)`
  margin: 0 0 0 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 10px 0 0 0;
    width: 100%;
  }
`;

type Props = {
  className?: string;
  title: string;
  buttonLabel: string;
  inputLabel: string;
  onSubmit: (values: ImageFormFields, helpers: FormikHelpers<ImageFormFields>) => void;
};

const validate = (values: ImageFormFields): FormikErrors<ImageFormFields> => {
  const errors: FormikErrors<ImageFormFields> = {};

  if (!values.image) {
    errors.image = 'No image selected';
  }

  return errors;
};

const ImageForm = ({ className, title, buttonLabel, inputLabel, onSubmit }: Props): ReactElement => {
  const initialValues: ImageFormFields = {
    crop: { aspect: 1, x: 0, y: 0, height: 25, width: 25, unit: '%' },
    image: null,
  };

  return (
    <Formik validate={validate} onSubmit={onSubmit} initialValues={initialValues}>
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Form className={className} onSubmit={handleSubmit}>
          <InputLabel color="primaryDarker" fontWeight="semiBold" fontSize="normal">
            {title}
          </InputLabel>
          <ImagePickerStyled
            crop={values.crop}
            image={values.image}
            onImageChange={image => setFieldValue('image', image)}
            onCropChange={(crop, percentCrop) => setFieldValue('crop', percentCrop)}
            onImageClear={() => setFieldValue('image', null)}
            inputLabel={inputLabel}
          >
            <FormButtonStyled type="submit" fontWeight="light" disabled={isSubmitting}>
              {buttonLabel}
            </FormButtonStyled>
          </ImagePickerStyled>
          <FormErrorStyled name="image" />
        </Form>
      )}
    </Formik>
  );
};

export default ImageForm;
