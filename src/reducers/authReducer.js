import { types } from '../types/types';

const initialState = {
   userEmail: null,
   userToken: null,
   checking: true,
};

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.login:
         return {
            ...state,
            userEmail: action.payload.userEmail,
            userToken: action.payload.userToken,
            checking: false
         };
      case types.register:
         return {
            ...state,
            userEmail: action.payload.userEmail,
            userToken: action.payload.userToken,
            checking: false
         };

      case types.logout:
         return {
            userEmail: null,
            userToken: null,
            checking: false
         };
      case types.authCheckingFinish:
         return {
            ...state,
            checking: false,
         };

      default:
         return state;
   }
};
