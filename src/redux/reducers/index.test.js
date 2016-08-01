/* global describe, it */
import { expect } from 'chai'

import rootReducer, { newElevator, newFloor } from './index'
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

describe('redux/reducers', () => {
  it('handles initialization with empty initial state.', () => {
    const initialState = {
    }
    const action = {
      type: 'unknown'
    }
    const nextState = rootReducer(initialState, action)
    expect(nextState).to.have.property('lifts').with.length(2)
    expect(nextState).to.have.property('floors').with.length(2)
  })

  it('handles ADD_LIFT with empty initial state.', () => {
    const initialState = {
      lifts: []
    }
    const action = {
      type: ADD_LIFT
    }
    const nextState = rootReducer(initialState, action)
    expect(nextState).to.have.property('lifts').with.length(1)
    expect(nextState).to.have.property('floors').with.length(2)
  })

  it('handles ADD_FLOOR with empty initial state.', () => {
    const initialState = {
      floors: []
    }
    const action = {
      type: ADD_FLOOR
    }
    const nextState = rootReducer(initialState, action)
    expect(nextState).to.have.property('lifts').with.length(2)
    expect(nextState).to.have.property('floors').with.length(1)
  })

  it('toggles ANSWER and CALL.', () => {
    const initialState = {
      floors: [
        newFloor(3),
        newFloor(2),
        newFloor(1)
      ],
      lifts: [newElevator(1)]
    }
    const callAction = {
      type: TOGGLE_CALL,
      floorNum: 3
    }
    const answerAction = {
      type: TOGGLE_ANSWER,
      floorNum: 1
    }
    const nextState = rootReducer(rootReducer(initialState, callAction), answerAction)
    expect(initialState).to.have.property('floors').with.deep.property(`[${initialState.floors.length - callAction.floorNum}].isCalling`).to.be.false
    expect(initialState).to.have.property('floors').with.deep.property(`[${initialState.floors.length - answerAction.floorNum}].isAnswered`).to.be.false
    expect(nextState).to.have.property('floors').with.deep.property(`[${nextState.floors.length - callAction.floorNum}].isCalling`).to.be.true
    expect(nextState).to.have.property('floors').with.deep.property(`[${nextState.floors.length - answerAction.floorNum}].isAnswered`).to.be.true
  })

  it('handles SET statuses.', () => {
    const initialState = {
      floors: [
        newFloor(3),
        newFloor(2),
        newFloor(1)
      ],
      lifts: [
        newElevator(1),
        newElevator(2),
        newElevator(3)
      ]
    }

    const floorStatusAction = {
      type: SET_FLOOR_STATUS,
      floorNum: 3,
      status: 'NEW_STATUS'
    }
    const elevatorStatusAction = {
      type: SET_ELEVATOR_STATUS,
      elevatorId: 1,
      status: ElevatorStatus.STAYING
    }
    const elevatorMovingAction = {
      type: SET_ELEVATOR_STATUS,
      elevatorId: 3,
      status: ElevatorStatus.MOVING,
      target: 3
    }
    const elevatorPositionAction = {
      type: SET_ELEVATOR_POSITION,
      elevatorId: 2,
      floorNum: 3
    }
    const nextState = rootReducer(rootReducer(rootReducer(rootReducer(initialState, floorStatusAction), elevatorStatusAction), elevatorMovingAction), elevatorPositionAction)
    const liftsExpectation = [
      {
        elevatorId: 1,
        position: 1,
        state: ElevatorStatus.STAYING,
        target: undefined
      },
      {
        elevatorId: 2,
        position: 3,
        state: ElevatorStatus.FREE,
        target: 1
      },
      {
        elevatorId: 3,
        position: 1,
        state: ElevatorStatus.MOVING,
        target: 3
      }
    ]
    expect(nextState).to.have.property('lifts').that.deep.equals(liftsExpectation)
    expect(nextState).to.have.property('floors').with.deep.property(`[${nextState.floors.length - floorStatusAction.floorNum}].state`).to.equal(floorStatusAction.status)
  })


})
