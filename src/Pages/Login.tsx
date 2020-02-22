import React, { ReactElement, useState } from 'react';

import RadioButton from 'Atoms/Radio';
import RadioButtonOptionType from 'Types/Radio';

const options: RadioButtonOptionType[] = [
  { value: 'login', label: 'Log in' },
  { value: 'signup', label: 'Sign up' },
];

const Login = (): ReactElement => {
  const [radioValue, setRadioValue] = useState('login');

  return (
    <RadioButton
      options={options}
      name="login-switcher"
      fontWeight="light"
      value={radioValue}
      onChange={e => setRadioValue(e.target.value)}
    />
  );
};

export default Login;
