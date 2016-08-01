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

function newFloor (floorNum) {
  return Object.assign({}, FLOOR_INITIAL_STATE, {floorNum})
}

export const LIFT_INITIAL_STATE = {
  position: 1,
  state: ElevatorStatus.FREE,
  target: 1
}

function newElevator (elevatorId) {
  return Object.assign({}, LIFT_INITIAL_STATE, {elevatorId})
}

function floorReducers (state = [
  newFloor(1),
  newFloor(2)
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
        newFloor(state.length + 1)
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
  newElevator(1),
  newElevator(2)
], action) {
  switch (action.type) {
    case ADD_LIFT:
      return [
        ...state,
        newElevator(state.length + 1)
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
