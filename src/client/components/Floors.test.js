/* global describe, it */
import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import Floors from './Floors'

function setup () {
  const props = {
    floors: [
      {
        isCalling: false,
        isAnswered: false,
        state: 'IDLING',
        floorNum: 3
      },
      {
        isCalling: false,
        isAnswered: false,
        state: 'IDLING',
        floorNum: 2
      },
      {
        isCalling: false,
        isAnswered: false,
        state: 'IDLING',
        floorNum: 1
      }
    ],
    addFloor: expect.createSpy(),
    toggleCallIfNeeded: expect.createSpy()
  }
  const enzymeWrapper = shallow(<Floors {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components/Floors', () => {
  it('should render self and subcomponents.', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.childAt(0).type()).toBe('button')
    expect(enzymeWrapper.childAt(0).text()).toBe('Add Floor')
    expect(enzymeWrapper.find('ul').children().length).toEqual(3)
    enzymeWrapper.find('ul').children().find('button').forEach(node => {
      expect(node.text()).toBe('CALL')
      expect(node.props().disabled).toBe(false)
    })
  })

  it('should call addFloor if button is pressed.', () => {
    const { enzymeWrapper, props } = setup()
    const button = enzymeWrapper.find('div').childAt(0)
    expect(props.addFloor.calls.length).toBe(0)
    button.props().onClick()
    expect(props.addFloor.calls.length).toBe(1)
  })

  it('should call toggleCallIfNeeded if CALL button is pressed.', () => {
    const { enzymeWrapper, props } = setup()
    const buttons = enzymeWrapper.find('ul').children().find('button')
    expect(props.toggleCallIfNeeded.calls.length).toBe(0)
    buttons.forEach(node => {
      expect(node.text()).toBe('CALL')
      expect(node.props().disabled).toBe(false)
      node.props().onClick()
    })
    expect(props.toggleCallIfNeeded.calls.length).toBe(3)
    buttons.at(0).props().onClick()
    expect(props.toggleCallIfNeeded.calls.length).toBe(4)
  })
})
