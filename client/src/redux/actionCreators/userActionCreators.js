import { UNAUTHORIZED_USER, SET_USER, INIT_ALL_USERS, UPDATE_USER } from "../actiontypes";

export const setUserAC = (payload) => ({
  type: SET_USER,
  payload, 
})

export const setUserUnauthorized = () => ({
  type: UNAUTHORIZED_USER
})

export const initAllUsersAC = (payload) => ({
  type: INIT_ALL_USERS,
  payload
})

export const updateUserAC = (payload) => ({
  type: UPDATE_USER,
  payload
})
