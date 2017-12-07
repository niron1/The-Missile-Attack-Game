// (c) Nir Oren 2017

import {MOVE_LEFT,MOVE_RIGHT,REST_IN_PLACE,MISSLES_NEXT,REMOVE_MISSLE,BOOM_MISSLE, ADD_MISSLE,REDUCE_LIVES,NEW_GAME} from '../constants/ActionTypes';
import {MAX_RIGHT,MAX_BOTTOM,STEPS,MAX_LIVES} from '../constants/Params'

const preloadedState = {
  ui: {
    direction: REST_IN_PLACE,
    location: 500
  },
  numLives: MAX_LIVES,
  missles: [],
  gameOver: false,
}


const reduceMissles = (state) => {
  let missles = Object.assign([], state.missles);
  for (let i=missles.length-1;i>=0;i--) {
    missles[i].y ++;
    if (missles[i].y>MAX_BOTTOM) {
      missles.splice(i,1);
    }
  }
  return missles;
}

const removeMissle = (state,index) => {
  let missles = Object.assign([], state.missles);
  missles.splice(index,1);
  return missles;
}
const boomMissle = (state,index) => {
  let missles = Object.assign([], state.missles);
  missles[index].boom = true;
  return missles;
}

const addMissle = (state,location) => {
  let missles = Object.assign([], state.missles);
  missles.push( {x:location, y:0, boom:false});
  return missles;
}

const gameReducer = (state = preloadedState, action) => {
  let l;
  switch (action.type) {
    case MOVE_LEFT:
      l = state.ui.location;
      l-=STEPS;
      if (l<0) l = 0;
      return {...state, ui: {...state.ui, direction: MOVE_LEFT, location:l}}      
    case MOVE_RIGHT:
      l = state.ui.location;
      l+=STEPS;
      if (l>MAX_RIGHT) l = MAX_RIGHT;
      return {...state, ui: {...state.ui, direction: MOVE_RIGHT, location:l}}
    case REST_IN_PLACE:
      return {...state, ui: {...state.ui, direction: REST_IN_PLACE}}
    case MISSLES_NEXT:
      return {...state, missles: reduceMissles(state)}
    case REMOVE_MISSLE:
      return {...state, missles: removeMissle(state,action.value)}
    case BOOM_MISSLE:
      return {...state, missles: boomMissle(state,action.value)}
    case ADD_MISSLE:
      return {...state, missles: addMissle(state,action.value)}
    case REDUCE_LIVES:
      let lives = state.numLives-1;
      let gameOver = state.gameOver;
      if (lives<0) {
        lives = 0;
        gameOver = true;
      }
      return {...state, numLives: lives, gameOver:gameOver}
    case NEW_GAME:
      return preloadedState;

    default:
      return state;
  }
}

export default gameReducer;