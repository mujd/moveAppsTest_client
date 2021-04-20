import { useState } from 'react';
import validator from 'validator';

export const useFormErrors = (formValues = [], phoneList = []) => {
   const [formErrors, setFormErrors] = useState({
      email: '',
      password: '',
      phone: '',
   });

   const validatePassword = () => {
      const uppercase = /[A-Z]/;
      const lowercase = /[a-z]/;
      const number = /(.*[0-9]{2,2})/;
      // const special = /[\W]{1,}/;
      if (formValues?.password.length < 8) {
         setFormErrors({
            ...formErrors,
            password: 'El password debe contener mas de 8 letras',
         });
         return false;
      } else if (formValues?.password !== formValues?.password2) {
         setFormErrors({
            ...formErrors,
            password: 'Los password no son iguales',
         });
         return false;
      } else if (
         !number.test(formValues?.password) ||
         !uppercase.test(formValues?.password) ||
         !lowercase.test(formValues?.password)
      ) {
         setFormErrors({
            ...formErrors,
            password:
               'El password debe contener al menos 2 numeros, 1 mayúscula y 1 minúscula',
         });
         return false;
      } else {
         setFormErrors({
            ...formErrors,
            password: '',
         });
         return true;
      }
   };
   const validateEmail = () => {
      if (formValues?.email.trim().length === 0) {
         setFormErrors({
            ...formErrors,
            email: 'El email es obligatorio',
         });
         return false;
      } else if (!validator.isEmail(formValues?.email)) {
         setFormErrors({
            ...formErrors,
            email: 'El email no es válido',
         });
         return false;
      } else {
         setFormErrors({
            ...formErrors,
            email: '',
         });
         return true;
      }
   };
   const validatePhones = () => {
      if (phoneList[0].number.trim().length === 0) {
         setFormErrors({
            ...formErrors,
            phone: 'Debes ingresar al menos un teléfono',
         });
         return false;
      } else {
         setFormErrors({
            ...formErrors,
            phone: '',
         });
         return true;
      }
   };

   return {
      formValues,
      validateEmail,
      validatePassword,
      validatePhones,
      formErrors,
   };
};
