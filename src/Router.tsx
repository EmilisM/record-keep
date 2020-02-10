import React, { FC } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';

const Router: FC = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route component={Home} />
  </BrowserRouter>
);

export default Router;
