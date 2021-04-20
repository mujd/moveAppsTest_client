import React from 'react';
import { ImSpinner2 } from '../icons';

const index = () => {
   return (
      <div className="w-screen h-screen flex justify-center items-center">
         <div className="flex flex-col items-center justify-center">
            <ImSpinner2 className="animate-spin text-gray-700 text-7xl mb-3" />
            <span className="animate-pulse font-semibold text-xl">Cargando</span>
         </div>
      </div>
   );
};

export default index;
