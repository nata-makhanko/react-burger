import { useSelector } from "react-redux";

import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ element, path }) => {
  const { isUserLoaded, authauthorized } = useSelector((state) => state.auth);
  const location = useLocation();

  if (authauthorized) {
    return (
      <Route path={path} exact>
        {element}
      </Route>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }
};

export default ProtectedRouteElement;
