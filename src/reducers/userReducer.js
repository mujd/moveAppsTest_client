import { types } from '../types/types';

const initialState = {
   users: null,
   user: null,
   activeUser: null,
};

export const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.getUsers:
         return {
            ...state,
            users: action.payload,
         };
      case types.newUser:
         return {
            ...state,
            user: action.payload,
         };
      case types.updateUser:
         return {
            ...state,
            users: state.users.map((user) =>
               user.id === action.payload.id ? (user = action.payload) : user
            ),
         };
      case types.deleteUser:
         return {
            ...state,
            // users: state.users.filter((user) => user.id !== action.payload),
            user: null,
         };
      case types.userSetActive:
         return {
            ...state,
            activeUser: action.payload,
         };
      case types.userClearActiveUser:
         return {
            ...state,
            activeUser: null,
         };

      default:
         return state;
   }
};
