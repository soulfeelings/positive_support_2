import { ADD_CIRCLE, INIT_CIRCLES, INIT_ONE_CIRCLE } from "../actiontypes";

export const initOneCircleAC = (payload) => ({
  type: INIT_ONE_CIRCLE,
  payload
})

export const initCirlesAC = (payload) => ({
  type: INIT_CIRCLES,
  payload
})

export const addCirlesAC = (payload) => ({
  type: ADD_CIRCLE,
  payload
})
