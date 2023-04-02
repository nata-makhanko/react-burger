import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";
import { getCookie } from "../utils/cookies";

import {Location} from 'history';

type TProtectedRouteProps = {
  onlyForAuth: boolean, 
  children: React.ReactNode,
  path: string,
  exact?: boolean,
}


const ProtectedRoute = ({ onlyForAuth, children, ...rest }: TProtectedRouteProps) => {
  const isAuthorized = getCookie("token");
  const location = useLocation<{from: Location}>();
  if (!onlyForAuth && isAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
