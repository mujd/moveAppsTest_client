import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { uiOpenModal } from '../../../actions/ui';
import { deleteUserAction, userSetActiveAction } from '../../../actions/user';
import { BiPencil, BiTrash, ImSpinner2 } from '../../ui/icons';
import SearchInput from '../../ui/SearchInput';

export const UsersList = ({ users }) => {
   const [usersFiltered, setUsersFiltered] = useState([]);
   const [term, setTerm] = useState('');

   useEffect(() => {
      if (users) {
         setUsersFiltered(
            users?.filter((user) =>
               user.email.toLowerCase().includes(term.toLowerCase())
            )
         );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [term, users]);

   const dispatch = useDispatch();
   const deleteUser = (user) => {
      const userEmail = localStorage.getItem('email') || '';
      if (userEmail === user.email) {
         return Swal.fire(
            'Espera!',
            'No te puedes borrar a ti mismo.',
            'warning'
         );
      } else {
         return Swal.fire({
            title: 'Estas seguro(a)?',
            text: 'Esta acción no tiene vuelta atras!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Borralo!',
            cancelButtonText: 'No, dejemoslo',
         }).then((result) => {
            if (result.value) {
               dispatch(deleteUserAction(user));
               // For more information about handling dismissals please visit
               // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
               Swal.fire('Cancelado', 'Tu usario esta a salvo :)', 'error');
            }
         });
      }
   };

   const editUser = (user) => {
      dispatch(userSetActiveAction(user));
      dispatch(uiOpenModal());
   };

   return (
      <div className="shadow-lg bg-white rounded-sm p-4 overflow-x-auto">
         <div className="flex">
            <SearchInput onDebounce={(value) => setTerm(value)} />
         </div>
         <table className="w-full table-auto">
            <thead className="font-semibold">
               <tr>
                  <th className="bg-gray-200 border text-left px-8 py-3">#</th>
                  <th className="bg-gray-200 border text-left px-8 py-3">
                     Email
                  </th>
                  <th className="bg-gray-200 border text-left px-8 py-3">
                     Teléfono(s)
                  </th>
                  {/* <th className="bg-gray-200 border text-left px-8 py-3">
                     Role
                  </th> */}
                  <th className="bg-gray-200 border text-left px-8 py-3">
                     Acciones
                  </th>
               </tr>
            </thead>
            <tbody>
               {usersFiltered?.length >= 1 ? (
                  usersFiltered.map((user) => (
                     <tr key={user.id} className="text-xs xl:text-base">
                        <td className="border px-8 py-2">{user.id}</td>
                        <td className="border px-8 py-2">{user.email}</td>
                        <td className="border px-8 py-2">
                           {user.phones.map((phone, i, arr) => (
                              <ul key={phone.number}>
                                 <li>
                                    <span className="font-semibold">
                                       ({phone.countryCode + phone.cityCode})
                                    </span>
                                    {phone.number}
                                    {i !== arr.length - 1 ? ', ' : ''}
                                 </li>
                              </ul>
                           ))}
                        </td>
                        {/* <td className="border px-8 py-2">{user.role}</td> */}
                        <td className="border px-8 py-2">
                           <div className="flex flex-row justify-evenly">
                              <button
                                 className="w-10 btn-icon btn-primary"
                                 onClick={() => editUser(user)}>
                                 <BiPencil />
                              </button>
                              <button
                                 className="w-10 btn-icon btn-danger"
                                 onClick={() => deleteUser(user)}>
                                 <BiTrash />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td className="border px-8 py-4" colSpan="4">
                        <div className="w-full flex justify-center items-center">
                           <span className="font-semibold">
                              {!users ? (
                                 <div className="flex flex-row items-center justify-between">
                                    <ImSpinner2 className="animate-spin mr-2 text-lg" />{' '}
                                    <span>Cargando</span>
                                 </div>
                              ) : usersFiltered.length >= 1 ? (
                                 ''
                              ) : (
                                 <span>
                                    No existe el usuario: {term}
                                 </span>
                              )}
                           </span>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};
