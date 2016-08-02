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
  it('should render self and subcomponents.', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.childAt(0).type()).toBe('h1')
    expect(enzymeWrapper.children().length).toBe(3)
  })

})
