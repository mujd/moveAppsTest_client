import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginScreen } from '../components/pages/Auth/LoginScreen';
import { RegisterScreen } from '../components/pages/Auth/RegisterScreen';

export const AuthRouter = () => {
   return (
      <div className="flex justify-center items-center w-screen h-screen m-0 bg-gray-700">
         <Switch>
            <Route exact path="/auth/login" component={LoginScreen} />

            <Route exact path="/auth/registro" component={RegisterScreen} />

            <Redirect to="/auth/login" />
         </Switch>
      </div>
   );
};
