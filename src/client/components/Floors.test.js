/* global describe, it */
import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import Floors from './Floors'

function setup () {
  const props = {
    floors: []
  }
  const enzymeWrapper = shallow(<Floors {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components/Floors', () => {
  it('should render self and subcomponents.')

  it('should call addFloor if button is pressed.')

  it('should call toggleCallIfNeeded if CALL button is pressed.')
})
