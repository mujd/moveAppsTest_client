import React from 'react';
import { useDispatch } from 'react-redux';
import { UserName } from '..';
import { logoutAction } from '../../../actions/auth';
import { BiLogOut } from '../icons';

const Navbar = () => {
   const dispatch = useDispatch();

   const hanleLogout = () => {
      dispatch(logoutAction());
   };

   return (
      <nav className="flex flex-row items-center justify-between bg-gray-600 text-white px-4 xl:px-16 h-16">
         <div className="logo">
            <span className="text-2xl">MoveAppsTest</span>
         </div>

         <div className="flex items-center">
            <div className="hidden md:flex flex-row items-center relative">
               <UserName />
            </div>

            <button
               className="btn btn-light ml-4 flex flex-row items-center"
               onClick={hanleLogout}>
               <BiLogOut className="text-base mr-1" />
               Logout
            </button>
         </div>
      </nav>
   );
};

export default Navbar;
