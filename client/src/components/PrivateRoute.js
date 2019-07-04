import React from 'react';
import { Route, Redirect } from 'react-router-dom';


function PrivateRoute({ component: Component, ...rest }) { // from https: /reacttraining.com
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('username') 
        ? ( <Component {...props} />) 
        : (alert("Please Log In to access."),
            <Redirect to={{
                pathname: "/signin",
                state: { from: props.location }
                }}/>
          )
      }
    />
  );
}

export default PrivateRoute;