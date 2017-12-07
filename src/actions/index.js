import * as types from '../constants/ActionTypes';

export const moveLeft = () =>
({
  type: types.MOVE_LEFT
})

export const moveRight = () =>
({
  type: types.MOVE_RIGHT
})

export const restInPlace = () => ({
  type: types.REST_IN_PLACE
})

export const misslesNext = () => ({
  type: types.MISSLES_NEXT
})

export const removeMissle = (index) => ({
  type: types.REMOVE_MISSLE,
  value: index
})

export const addMissle = (value) => ({
  type: types.ADD_MISSLE,
  value: value
})
export const boomMissle = (value) => ({
  type: types.BOOM_MISSLE,
  value: value
})
export const reduceLives = () => ({
  type: types.REDUCE_LIVES
})

export const newGame = () => ({
  type: types.NEW_GAME
})