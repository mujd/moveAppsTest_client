import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startChecking } from '../actions/auth';
import { UsersScreen } from '../components/pages/users';
import { Loader } from '../components/ui';

export const AppRouter = () => {
   const dispatch = useDispatch();
   const { checking, userToken } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(startChecking());
   }, [dispatch]);

   if (checking) {
      return <Loader />;
   }

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute
                  path="/auth"
                  component={AuthRouter}
                  isAuthenticated={!!userToken}
               />

               <PrivateRoute
                  exact
                  isAuthenticated={!!userToken}
                  path="/"
                  component={UsersScreen}
               />

               <Redirect to="/auth/login" />
            </Switch>
         </div>
      </Router>
   );
};
