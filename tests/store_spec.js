import { expect } from 'chai'
import rootReducer, {LIFT_INITIAL_STATE, FLOOR_INITIAL_STATE} from '../src/redux/reducers'
import { createStore, applyMiddleware } from 'redux'


describe('Store', () => {
  it('is a Redux store with right initialization and handles ADD_LIFT and ADD_FLOOR', () => {
    const store = createStore(rootReducer)
    expect(store.getState()).to.be.an('object').with.property('lifts')
      .that.is.an('array').with.length(2)
    expect(store.getState()).to.be.an('object').with.property('floors')
      .that.is.an('array').with.length(2)
    store.dispatch({
      type: 'ADD_LIFT'
    })
    expect(store.getState()).to.be.an('object').with.property('lifts')
      .that.is.an('array').with.length(3)
    expect(store.getState()).to.be.an('object').with.property('floors')
      .that.is.an('array').with.length(2)
    store.dispatch({
      type: 'ADD_FLOOR'
    })
    expect(store.getState()).to.be.an('object').with.property('lifts')
      .that.is.an('array').with.length(3)
    expect(store.getState()).to.be.an('object').with.property('floors')
      .that.is.an('array').with.length(3)
  })
})
