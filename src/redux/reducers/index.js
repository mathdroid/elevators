import { combineReducers } from 'redux'

import {
  ADD_FLOOR,
  TOGGLE_CALL,
  SET_ELEVATOR_STATUS,
  ADD_LIFT,
  ElevatorStatus
} from '../actions'

const FLOOR_INITIAL_STATE = {
  calling: false
}

const LIFT_INITIAL_STATE = {
  position: 0,
  state: ElevatorStatus.FREE,
  target: 0
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

function liftReducers (state = [LIFT_INITIAL_STATE, LIFT_INITIAL_STATE], action) {
  switch (action.type) {
    case ADD_LIFT:
      return [
        ...state,
        LIFT_INITIAL_STATE
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  floorReducers,
  liftReducers
})

export default rootReducer
