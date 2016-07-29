import { combineReducers } from 'redux'

import {
  ADD_FLOOR,
  TOGGLE_CALL,
  TOGGLE_ANSWER,
  SET_FLOOR_STATUS,
  SET_ELEVATOR_STATUS,
  SET_ELEVATOR_POSITION,
  ADD_LIFT,
  ElevatorStatus
} from '../actions'

export const FLOOR_INITIAL_STATE = {
  isCalling: false,
  isAnswered: false,
  state: 'IDLING'
}

export const LIFT_INITIAL_STATE = {
  position: 1,
  state: ElevatorStatus.FREE,
  target: 1
}

function floorReducers (state = [
  Object.assign({}, FLOOR_INITIAL_STATE, {floorNum: 1}),
  Object.assign({}, FLOOR_INITIAL_STATE, {floorNum: 2})
], action) {
  switch (action.type) {
    case TOGGLE_CALL:
      return [
        ...state.slice(0, action.floorNum - 1),
        Object.assign({}, state[action.floorNum - 1], {isCalling: !state[action.floorNum - 1].isCalling}),
        ...state.slice(action.floorNum)
      ]
    case TOGGLE_ANSWER:
      return [
        ...state.slice(0, action.floorNum - 1),
        Object.assign({}, state[action.floorNum - 1], {isAnswered: !state[action.floorNum - 1].isAnswered}),
        ...state.slice(action.floorNum)
      ]
    case ADD_FLOOR:
      return [
        ...state,
        Object.assign({}, FLOOR_INITIAL_STATE, {floorNum: state.length + 1})
      ]
    case SET_FLOOR_STATUS:
      return [
        ...state.slice(0, action.floorNum - 1),
        Object.assign({}, state[action.floorNum - 1], {state: action.status}),
        ...state.slice(action.floorNum)
      ]
    default:
      return state
  }
}

function liftReducers (state = [
  Object.assign({}, LIFT_INITIAL_STATE, {elevatorId: 1}),
  Object.assign({}, LIFT_INITIAL_STATE, {elevatorId: 2})
], action) {
  switch (action.type) {
    case ADD_LIFT:
      return [
        ...state,
        Object.assign({}, LIFT_INITIAL_STATE, {elevatorId: state.length + 1})
      ]
    case SET_ELEVATOR_STATUS:
      return [
        ...state.slice(0, action.elevatorId - 1),
        Object.assign({}, state[action.elevatorId - 1], {state: action.status, target: action.target}),
        ...state.slice(action.elevatorId)
      ]
    case SET_ELEVATOR_POSITION:
      return [
        ...state.slice(0, action.elevatorId - 1),
        Object.assign({}, state[action.elevatorId - 1], {position: action.floorNum}),
        ...state.slice(action.elevatorId)
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  floors: floorReducers,
  lifts: liftReducers
})

export default rootReducer
