import {
  UNAUTHORIZED_USER,
  SET_USER,
  INIT_ALL_USERS,
  UPDATE_USER,
  REQUEST_UPDATE_SUTUATION,
  REQUEST_UPDATE_SUTUATION_SUCCESS,
  REQUEST_UPDATE_SUTUATION_ERROR,
} from '../actiontypes';

export const setUserAC = (payload) => ({
  type: SET_USER,
  payload,
});

export const setUserUnauthorized = () => ({
  type: UNAUTHORIZED_USER,
});

export const initAllUsersAC = (payload) => ({
  type: INIT_ALL_USERS,
  payload,
});

export const updateUserAC = (payload) => ({
  type: UPDATE_USER,
  payload,
});
// обновление ситуации пользователя
export const requestingUpdateSituationAC = () => ({
  type: REQUEST_UPDATE_SUTUATION,
});

export const updateSituationSuccessAC = (situation) => ({
  type: REQUEST_UPDATE_SUTUATION_SUCCESS,
  payload: situation,
});

export const updateSituationErrorAC = (error) => ({
  type: REQUEST_UPDATE_SUTUATION_ERROR,
  payload: error,
});
