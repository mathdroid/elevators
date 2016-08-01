/* global describe, it */
import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './index.js'

// Async actions are unit-tested by creating a mock store.

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('redux/actions', () => {
  it('handles ADD_LIFT', () => {
    const expectedAction = {type: actions.ADD_LIFT}
    expect(actions.addLift()).to.deep.equal(expectedAction)
    // return store.dispatch(actions.addLift).then(() => {
    //   expect(store.getActions()).to.deep.equal([expectedAction])
    // })
  })

  it('handles ADD_FLOOR', () => {
    const expectedAction = {type: actions.ADD_FLOOR}
    expect(actions.addFloor()).to.deep.equal(expectedAction)
  })

  it('does not toggle "Call" if lift is available in a floor.', () => {
    const store = mockStore({
      floors: [
        {floorNum:3,isAnswered:false,isCalling:false,state:"IDLING"},
        {floorNum:2,isAnswered:false,isCalling:false,state:"IDLING"},
        {floorNum:1,isAnswered:false,isCalling:false,state:"IDLING"}
      ],
      lifts: [
        {elevatorId:1,position:2,state:"STAYING",target:1},
        {elevatorId:2,position:1,state:"FREE",target:1}
      ]
    })
    const expectedActions = []

    return store.dispatch(actions.toggleCallIfNeeded(2)).then(() => {
      expect(store.getActions()).to.be.empty
    })
  })
  it('toggles "Call" if lift is available in another floor.', () => {
    const store = mockStore({
      floors: [
        {floorNum:3,isAnswered:false,isCalling:false,state:"IDLING"},
        {floorNum:2,isAnswered:false,isCalling:false,state:"IDLING"},
        {floorNum:1,isAnswered:false,isCalling:false,state:"IDLING"}
      ],
      lifts: [
        {elevatorId:1,position:2,state:"STAYING",target:1},
        {elevatorId:2,position:1,state:"FREE",target:1}
      ]
    })
    const expectedAction = { type: actions.TOGGLE_CALL, floorNum: 3 }

    return store.dispatch(actions.toggleCallIfNeeded(3)).then(() => {
      expect(store.getActions()).to.have.deep.property('[0]').which.deep.equals(expectedAction)
    })
  })
})
