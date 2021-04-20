import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { loginAction } from '../../../actions/auth';
import { removeError } from '../../../actions/ui';
import { useForm } from '../../../hooks/useForm';
import { ImSpinner2 } from '../../ui/icons';

export const LoginScreen = () => {
   const dispatch = useDispatch();
   const { loading, msgError } = useSelector((state) => state.ui);
   const [formValues, handleInputChange] = useForm({
      email: '',
      password: '',
   });

   useEffect(() => {
      dispatch(removeError());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const { email, password } = formValues;

   const handleLogin = (e) => {
      e.preventDefault();
      dispatch(loginAction(formValues));
   };

   return (
      <div className="bg-white shadow-md rounded-sm p-5 w-72">
         <h3 className="mb-5 text-lg text-center font-semibold">Login</h3>
         {msgError && (
            <div className="bg-red-500 rounded-md text-white flex justify-center mb-3 px-3 py-2">
               {msgError}
            </div>
         )}
         <form onSubmit={handleLogin} className="fadeIn" noValidate>
            <div className="flex flex-col">
               <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email
               </label>
               <input
                  className="mb-2 borde focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-sm"
                  type="email"
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={handleInputChange}
               />
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Password
               </label>
               <input
                  className="mb-3 borde focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-sm"
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={handleInputChange}
               />
            </div>

            <button
               type="submit"
               className="btn btn-dark w-full mb-4"
               disabled={loading}>
               {loading ? (
                  <div className="flex flex-row items-center justify-between">
                     <ImSpinner2 className="animate-spin mr-2 text-lg" />{' '}
                     <span>Cargando</span>
                  </div>
               ) : (
                  'Iniciar sesión'
               )}
            </button>

            <div className="text-sm">
               <span>No tienes cuenta?</span>
               <Link to="/auth/registro" className="ml-1 font-semibold">
                  Registrate
               </Link>
            </div>
         </form>
      </div>
   );
};
