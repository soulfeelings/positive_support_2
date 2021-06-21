import { UNAUTHORIZED_USER, SET_USER } from "../actiontypes";

export const setUserAC = (payload) => ({
  type: SET_USER,
  payload, 
})

export const setUserUnauthorized = () => ({
  type: UNAUTHORIZED_USER
})
