export const types = {
   // AUTH
   login: '[Auth] Login',
   register: '[Auth] Register',
   logout: '[Auth] Logout',

   // UI
   uiSetError: '[UI] Set Error',
   uiRemoveError: '[UI] Remove Error',

   uiStartLoading: '[UI] Start loading',
   uiFinishLoading: '[UI] Finish loading',

   authCheckingFinish: '[auth] Finish checking login state',

   uiOpenModal: '[ui] Open modal',
   uiCloseModal: '[ui] Close modal',

   // Users
   getUsers: '[User] get all active users',
   newUser: '[User] new user',
   updateUser: '[User] update user',
   deleteUser: '[User] delete user',
   userSetActive: '[User] Set Active user',
   userClearActiveUser: '[User] Clear active user',
};
