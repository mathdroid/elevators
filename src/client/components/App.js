import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  addLift
} from '../../redux/actions'

class App extends Component {
  // constructor (props) {
  //   super(props)
  // }

  componentDidMount() {
    const { dispatch } = this.props

    window.globs = {
        addLift: () => {
          dispatch(addLift())
        },
    };
  }

  componentWillMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    const time = Date.now()
    return (
      <div>
        It is {time}
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps (state) {
  return state
}

export default connect(mapStateToProps)(App)
