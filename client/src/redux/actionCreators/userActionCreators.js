import { INIT_USER, SET_USER } from "../actiontypes";

export const setUserAC = (payload) => ({
  type: SET_USER,
  payload, 
})

export const initUserAC = (payload) => ({
  type: INIT_USER,
  payload
})
