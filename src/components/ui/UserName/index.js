import React from 'react';
import { useSelector } from 'react-redux';
import { BiUser } from '../icons';

const UserName = () => {
   const { userEmail } = useSelector((state) => state.auth);
   return (
      <>
         <span className="flex h-3 w-3 mr-1">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
         </span>
         <BiUser className="relative mr-2 text-lg" />
         <span>{userEmail}</span>
      </>
   );
};

export default UserName;
