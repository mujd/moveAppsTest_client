import React, { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { BiSearch, RiCloseLine } from '../icons';

const SearchInput = ({ onDebounce }) => {
   const [textValue, setTextValue] = useState('');
   const { debouncedValue } = useDebouncedValue(textValue);

   useEffect(() => {
      onDebounce(debouncedValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [debouncedValue]);
   return (
      <div className="flex flex-col mb-5 w-96">
         <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Buscar Usuario
         </label>
         <div className="mt-1 relative rounded-md shadow-sm">
            <input
               type="text"
               name="search"
               id="search"
               className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-4 pr-4 sm:text-sm border-gray-300 rounded-md"
               placeholder="buscar"
               value={textValue}
               onChange={(e) => setTextValue(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
               <div className="w-full">
                  {textValue ? (
                     <button
                        className="btn-icon btn-transparent"
                        onClick={() => setTextValue('')}>
                        <RiCloseLine className="text-lg" />
                     </button>
                  ) : (
                     <span className="flex justify-center items-center p-1 h-8 w-8 border border-transparent shadow-sm text-sm font-medium rounded-sm">
                        <BiSearch />
                     </span>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchInput;
