import React, { ReactElement } from 'react';
import CustomErrorMessage from './ErrorMessage';
import { ErrorMessage } from 'formik';

type Props = {
  className?: string;
  name: string;
};

const FormError = ({ className, name }: Props): ReactElement => {
  return (
    <ErrorMessage name={name}>
      {message => <CustomErrorMessage className={className}>{message}</CustomErrorMessage>}
    </ErrorMessage>
  );
};

export default FormError;
