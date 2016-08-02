/* global describe, it */
import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import Lifts from './Lifts'

function setup () {
  const props = {
    lifts: [
      {
        elevatorId: 1,
        position: 1,
        state: 'FREE',
        target: 1
      },
      {
        elevatorId: 2,
        position: 1,
        state: 'FREE',
        target: 1
      }
    ],
    addLift: expect.createSpy()
  }
  const enzymeWrapper = shallow(<Lifts {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components/Lifts', () => {
  it('should render self and subcomponents.', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('button').text()).toBe('Add Lift')
    expect(enzymeWrapper.find('ul').children().length).toEqual(2)
  })
  it('should call addLift if button is pressed.', () => {
    const { enzymeWrapper, props } = setup()
    const button = enzymeWrapper.find('button')
    expect(props.addLift.calls.length).toBe(0)
    button.props().onClick()
    expect(props.addLift.calls.length).toBe(1)
  })
})
