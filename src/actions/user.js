import Swal from 'sweetalert2';
import clientAxios from '../api';
import { types } from '../types/types';
import { finishLoading, startLoading, uiCloseModal } from './ui';

export const getUsersAction = () => {
   return async (dispatch) => {
      const token = localStorage.getItem('token') || '';
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };
      dispatch(startLoading());
      try {
         const resp = await clientAxios.get('/users', config);

         dispatch(getUsers(resp?.data));
         dispatch(finishLoading());
      } catch (error) {
         console.log('ERROR: ', error);
         dispatch(finishLoading());
      }
   };
};

const getUsers = (users) => ({
   type: types.getUsers,
   payload: users,
});

export const newUserAction = (user) => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const token = localStorage.getItem('token') || '';
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         const resp = await clientAxios.post('/users', user, config);
         dispatch(newUser(resp?.data));
         dispatch(uiCloseModal());
         dispatch(getUsersAction());
         dispatch(finishLoading());
         Swal.fire(
            'Usuario Registrado',
            `El usuario con email: ${resp.data.email} se registro exitosamente`,
            'success'
         );
      } catch (error) {
         console.log('ERROR: ', error);
         Swal.fire('Error', error, 'error');
         dispatch(finishLoading());
      }
   };
};

const newUser = (userEmail, userToken) => ({
   type: types.newUser,
   payload: {
      userEmail,
      userToken,
   },
});

export const deleteUserAction = (user) => {
   return async (dispatch) => {
      dispatch(startLoading());
      try {
         const token = localStorage.getItem('token') || '';
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         await clientAxios.delete(`/users/${user.id}`, config);
         Swal.fire('Usuario Borrado!', 'El usuario fue borrado.', 'success');
         dispatch(deleteUser());
         dispatch(getUsersAction());
         dispatch(finishLoading());
      } catch (error) {
         console.log('ERROR: ', error);
         Swal.fire('Error', error, 'error');
         dispatch(finishLoading());
      }
   };
};

const deleteUser = () => ({
   type: types.deleteUser,
});

export const updateUserAction = (id, user) => {
   return async (dispatch) => {
      if (!id) return;
      dispatch(startLoading());
      try {
         const token = localStorage.getItem('token') || '';
         const config = {
            headers: { Authorization: `Bearer ${token}` },
         };
         await clientAxios.put(`/users/${id}`, user, config);
         Swal.fire(
            'Usuario Actualizado!',
            'El usuario fue actualizado.',
            'success'
         );
         dispatch(updateUser(id));
         dispatch(uiCloseModal());
         dispatch(getUsersAction());
         dispatch(finishLoading());
      } catch (error) {
         console.log('ERROR: ', error);
         Swal.fire('Error', error, 'error');
         dispatch(finishLoading());
      }
   };
};

const updateUser = (id) => ({
   type: types.updateUser,
   payload: id,
});

export const userSetActiveAction = (user) => ({
   type: types.userSetActive,
   payload: user,
});

export const userClearActiveUserAction = () => ({
   type: types.userClearActiveUser,
});
