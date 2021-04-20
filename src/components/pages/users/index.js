import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, UserName } from '../../ui';
import { UsersList } from './UsersList';
import { getUsersAction } from '../../../actions/user';
import { UserModal } from './UserModal';
import { BiPlus } from '../../ui/icons';
import { uiOpenModal } from '../../../actions/ui';

export const UsersScreen = () => {
   const dispatch = useDispatch();
   const { users } = useSelector((state) => state.user);
   useEffect(() => {
      if (!users) {
         dispatch(getUsersAction());
      }
   }, [dispatch, users]);
   return (
      <div className="pb-24">
         <Navbar />
         <div className="mx-auto container lg:px-10 px-4 md:px-0">
            <div className="w-full my-10 flex items-center justify-between md:justify-end">
               <div className="flex md:hidden flex-row items-center relative">
                  <UserName />
               </div>
               <button
                  className="btn btn-dark"
                  onClick={() => dispatch(uiOpenModal())}>
                  <BiPlus className="text-white text-xl mr-2" /> Nuevo usuario
               </button>
            </div>
            <UsersList users={users} />
         </div>
         <UserModal />
      </div>
   );
};
