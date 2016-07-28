/* global describe, it */
import { expect } from 'chai'

import rootReducer from '../src/redux/reducers'

describe('rootReducer', () => {
  it('handles ADD_LIFT with [] initial state', () => {
    const initialState = {
      lifts: []
    }
    const action = {
      type: 'ADD_LIFT'
    }
    const nextState = rootReducer(initialState, action)
    expect(nextState).to.have.property('lifts').with.length(1)
    expect(nextState).to.have.property('floors').with.length(2)
  })

  it('handles ADD_FLOOR with [] initial state', () => {
    const initialState = {
      floors: []
    }
    const action = {
      type: 'ADD_FLOOR'
    }
    const nextState = rootReducer(initialState, action)
    expect(nextState).to.have.property('lifts').with.length(2)
    expect(nextState).to.have.property('floors').with.length(1)
  })
})
