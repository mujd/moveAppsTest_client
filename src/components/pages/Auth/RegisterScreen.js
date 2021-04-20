/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import {
   BiPlus,
   BiTrash,
   FaEyeSlash,
   FaRegEye,
   ImSpinner2,
} from '../../ui/icons';
import { chileanPhoneCityCode } from '../../../data/phoneCityCode';
import { phoneCountryCodes } from '../../../data/phoneCountryCodes';
import { registerAction } from '../../../actions/auth';
import { newUserAction, updateUserAction } from '../../../actions/user';
import { useFormErrors } from '../../../hooks/useFormErrors';
import { removeError } from '../../../actions/ui';

export const RegisterScreen = ({ fromModal = false }) => {
   const dispatch = useDispatch();
   const [showPassword, setShowPassword] = useState(false);
   const { loading, msgError } = useSelector((state) => state.ui);
   const { activeUser } = useSelector((state) => state.user);
   const phones = activeUser?.phones?.map((phone) => phone);

   useEffect(() => {
      dispatch(removeError());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [phoneList, setPhoneList] = useState(
      phones
         ? phones
         : [
              {
                 countryCode: phoneCountryCodes[0].code,
                 cityCode: chileanPhoneCityCode[0].code,
                 number: '',
              },
           ]
   );

   const [formValues, handleInputChange] = useForm({
      email: activeUser ? activeUser.email : '',
      password: activeUser ? activeUser.password : '',
      password2: activeUser ? activeUser.password : '',
   });

   const {
      validateEmail,
      validatePassword,
      validatePhones,
      formErrors,
   } = useFormErrors(formValues, phoneList);

   const { email, password, password2 } = formValues;

   const handleRegister = (e) => {
      e.preventDefault();
      const { email, password } = formValues;
      const user = {
         email,
         password,
         phones: [...phoneList],
      };
      if (validateEmail() && validatePassword() && validatePhones()) {
         if (Boolean(fromModal) && !activeUser) {
            dispatch(newUserAction(user));
         } else if (Boolean(fromModal) && activeUser) {
            dispatch(updateUserAction(activeUser.id, user));
         } else {
            dispatch(registerAction(user));
         }
      } else {
         return;
      }
   };

   // handle input change
   const handleInputPhoneChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...phoneList];
      list[index][name] = value;
      setPhoneList(list);
   };
   // handle click event of the Remove button
   const handleRemoveClick = (index) => {
      const list = [...phoneList];
      list.splice(index, 1);
      setPhoneList(list);
   };

   // handle click event of the Add button
   const handleAddClick = () => {
      setPhoneList([
         ...phoneList,
         {
            countryCode: phoneCountryCodes[0].code,
            cityCode: chileanPhoneCityCode[0].code,
            number: '',
         },
      ]);
   };

   return (
      <div
         className={`${
            fromModal ? 'p-5' : 'bg-white shadow-md rounded-sm p-5 w-96'
         }`}>
         <h3 className="mb-5 text-lg text-center font-semibold">
            {fromModal && !activeUser
               ? 'Nuevo'
               : activeUser
               ? 'Actualizar'
               : 'Registrate'}
         </h3>
         {msgError && (
            <div className="bg-red-500 rounded-md text-white flex justify-center mb-3 p-1">
               {msgError}
            </div>
         )}
         <form onSubmit={handleRegister} className="fadeIn" noValidate>
            <div className="flex flex-col">
               <label
                  htmlFor="email"
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
                  onBlur={validateEmail}
               />
               {formErrors?.email && (
                  <span className="text-red-500 text-sm">
                     {formErrors?.email}
                  </span>
               )}
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700">
                  Teléfono
               </label>
               {phoneList.map((x, i) => (
                  <div
                     key={i}
                     className="flex flex-row justify-between items-center">
                     <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                           <label htmlFor="countryCode" className="sr-only">
                              Codigo páis
                           </label>
                           <select
                              id="countryCode"
                              name="countryCode"
                              className="focus:ring-transparent focus:border-transparent h-full w-16 py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                              value={x.countryCode}
                              onChange={(e) => handleInputPhoneChange(e, i)}>
                              {phoneCountryCodes.map((countryCode) => (
                                 <option
                                    key={countryCode.code}
                                    value={countryCode.code}>
                                    {countryCode.code}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <div className="absolute inset-y-0 left-12 flex items-center">
                           <label htmlFor="cityCode" className="sr-only">
                              Codigo ciudad
                           </label>
                           <select
                              id="cityCode"
                              name="cityCode"
                              className="focus:ring-transparent focus:border-transparent h-full w-14 py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                              value={x.cityCode}
                              onChange={(e) => handleInputPhoneChange(e, i)}>
                              {chileanPhoneCityCode.map((cityCode) => (
                                 <option
                                    key={cityCode.code}
                                    value={cityCode.code}>
                                    {cityCode.code}
                                 </option>
                              ))}
                           </select>
                        </div>
                        <input
                           type="text"
                           name="number"
                           id="number"
                           className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-24 pr-2 sm:text-sm border-gray-300 rounded-md"
                           placeholder="2713272"
                           value={x.number}
                           onChange={(e) => handleInputPhoneChange(e, i)}
                           onBlur={validatePhones}
                        />
                     </div>

                     <div className="flex flex-row justify-start">
                        {phoneList.length !== 1 && (
                           <button
                              className="w-10 btn-icon btn-light ml-1"
                              onClick={() => handleRemoveClick(i)}>
                              <BiTrash />
                           </button>
                        )}
                        {phoneList.length - 1 === i && (
                           <button
                              className="w-10 btn-icon btn-light ml-1"
                              onClick={handleAddClick}>
                              <BiPlus />
                           </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
            {formErrors?.phone && (
               <span className="text-red-500 text-sm">{formErrors?.phone}</span>
            )}

            <div className="flex flex-col">
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Password
               </label>
               <div className="relative rounded-md shadow-sm mb-3">
                  <input
                     className="borde focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-sm"
                     type={showPassword ? 'text' : 'password'}
                     placeholder="Password"
                     name="password"
                     autoComplete="off"
                     value={password}
                     onChange={handleInputChange}
                     onBlur={validatePassword}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                     <button
                        className="btn-icon btn-transparent"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                     </button>
                  </div>
               </div>
               {formErrors?.password && (
                  <span className="text-red-500 text-sm">
                     {formErrors?.password}
                  </span>
               )}
            </div>
            <div className="flex flex-col">
               <label
                  htmlFor="password2"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Password
               </label>
               <div className="relative rounded-md shadow-sm mb-3">
                  <input
                     className="borde focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-sm"
                     type={showPassword ? 'text' : 'password'}
                     placeholder="Password"
                     name="password2"
                     autoComplete="off"
                     value={password2}
                     onChange={handleInputChange}
                     onBlur={validatePassword}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                     <button
                        className="btn-icon btn-transparent"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                     </button>
                  </div>
               </div>
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
               ) : fromModal && !activeUser ? (
                  'Nuevo'
               ) : activeUser ? (
                  'Actualizar'
               ) : (
                  'Registrate'
               )}
            </button>

            {!fromModal && (
               <div className="text-sm">
                  <span>ya tienes cuenta?</span>
                  <Link
                     to="/auth/login"
                     className="ml-1 font-semibold hover:text-gray-600">
                     Inicia sesión
                  </Link>
               </div>
            )}
         </form>
      </div>
   );
};
