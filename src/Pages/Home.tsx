import React, { ReactElement } from 'react';
import Link from '../Atoms/Link';

const Home = (): ReactElement => (
  <Link fontSize={20} to="Login">
    Login
  </Link>
);

export default Home;
