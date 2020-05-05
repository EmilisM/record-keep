import React, { ReactElement } from 'react';
import styled from 'styled-components/macro';
import InputLabel from 'Atoms/Input/InputLabel';
import ImagePicker from 'Molecules/ImagePicker';
import { Formik, FormikHelpers } from 'formik';
import { ImageFormFields } from 'Types/Image';
import Form from 'Atoms/Form/Form';
import FormButton from 'Atoms/Form/FormButton';

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
          >
            {inputLabel}
          </ImagePickerStyled>
          <FormButton type="submit" fontWeight="light" disabled={isSubmitting}>
            {buttonLabel}
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default ImageForm;
