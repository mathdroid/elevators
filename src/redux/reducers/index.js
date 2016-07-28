import { combineReducers } from 'redux'

import {
  ADD_FLOOR,
  TOGGLE_CALL,
  SET_ELEVATOR_STATUS
} from '../actions'

const FLOOR_INITIAL_STATE = {
  calling: false
}

function floorReducers (state = [FLOOR_INITIAL_STATE, FLOOR_INITIAL_STATE], action) {
  switch (action.type) {
    case TOGGLE_CALL:
      return [
        ...state.slice(0, action.floorNum-1),
        {calling: !state[action.floorNum-1].calling},
        ...state.slice(action.floorNum)
      ]
    case ADD_FLOOR:
      return [
        ...state,
        FLOOR_INITIAL_STATE
      ]
    default:
      return state
  }
}

export default floorReducers
