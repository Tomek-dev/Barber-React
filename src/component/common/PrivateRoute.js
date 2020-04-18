import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";

  const PrivateRoute = ({ component: Component, authenticated, currentUser, type, ...rest}) => (
    <Route {...rest} render={(props) => {
        if(authenticated === true && currentUser.type === type){
            return(
                <Component currentUser={currentUser} {...rest} {...props} />
            )
        }else{
            return(
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
        }
    }} />
  );

  export default PrivateRoute;

