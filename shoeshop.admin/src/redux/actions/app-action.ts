import { createTypeAction, createTypeAsyncAction } from '../type-redux';
import { Store } from 'redux';

// services
import ApiService from '../../services/api-service';

export const loginAction = createTypeAsyncAction(
  'LOGIN_ACTION',
  async (args: ADMIN_API.LoginParams) => {
    return await ApiService.login(args);
  },
);

export const getProfileAction = createTypeAsyncAction(
  'GET_PROFILE_ACTION',
  async () => {
    return await ApiService.getProfile();
  },
);

export const logOutAction = createTypeAsyncAction('LOGOUT_ACTION', async () => {
  return await ApiService.logout();
});
