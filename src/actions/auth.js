import { types } from '../types/types';
import { startLoading, finishLoading, setError, removeError } from './ui';
import { getUsersAction } from './user';
import clientAxios from '../api';

// const defaultUser = {
//    id: '',
//    email: '',
//    password: '',
//    created: '',
//    updated: '',
//    last_login: '',
//    // token: null,
//    isActive: true,
//    role: '',
//    phones: null,
// };
export const loginAction = (user) => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const resp = await clientAxios.post('/auth/login', user);

         localStorage.setItem('token', resp?.data?.token);
         localStorage.setItem('email', resp?.data?.email);
         localStorage.setItem('token-init-date', new Date().getTime());
         dispatch(login(resp?.data?.email, resp?.data?.token));
         dispatch(getUsersAction());
         dispatch(removeError());
         dispatch(finishLoading());
      } catch (error) {
         console.log('ERROR: ', error);
         dispatch(setError('Error, usuario o contraseña incorrectos'));
         dispatch(finishLoading());
      }
   };
};

const login = (userEmail, userToken) => ({
   type: types.login,
   payload: {
      userEmail,
      userToken,
   },
});

export const logoutAction = () => {
   return async (dispatch) => {
      localStorage.setItem('token', '');
      localStorage.setItem('email', '');
      localStorage.setItem('token-init-date', '');
      dispatch(logout());
   };
};

const logout = () => ({
   type: types.logout,
});

export const registerAction = (user) => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const resp = await clientAxios.post('/auth/register', user, {
            headers: { Authorization: null },
         });
         localStorage.setItem('token', resp?.data?.token);
         localStorage.setItem('email', resp?.data?.email);
         localStorage.setItem('token-init-date', new Date().getTime());
         dispatch(register(resp?.data?.email, resp?.data?.token));
         dispatch(getUsersAction());
         dispatch(removeError());
         dispatch(finishLoading());
      } catch (error) {
         console.log('ERROR: ', error);
         dispatch(setError('Error al registrarse'));
         dispatch(finishLoading());
      }
   };
};

const register = (userEmail, userToken) => ({
   type: types.register,
   payload: {
      userEmail,
      userToken,
   },
});

export const startChecking = () => {
   return async (dispatch) => {
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };
      const user = {
         email,
      };
      try {
         const resp = await clientAxios.post(`/auth/rev-token`, user, config);

         if (resp.status === 200) {
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(email, resp?.data?.token));
            dispatch(checkingFinish());
         } else {
            dispatch(checkingFinish());
         }
      } catch (error) {
         dispatch(checkingFinish());
      }
   };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });
