/* global describe, it */
import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'

import { App } from './App'

function setup () {
  const props = {
    lifts: [],
    floors: []
  }
  const enzymeWrapper = shallow(<App {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components/App', () => {
  it('should render self and subcomponents.')

})
