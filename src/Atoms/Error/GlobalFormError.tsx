import React, { ReactElement } from 'react';
import ErrorMessage from './ErrorMessage';
import { useField } from 'formik';

type Props = {
  className?: string;
};

const GlobalFormError = ({ className }: Props): ReactElement | null => {
  const [, meta] = useField({ name: 'form' });

  return meta.error ? <ErrorMessage className={className}>{meta.error}</ErrorMessage> : null;
};

export default GlobalFormError;
