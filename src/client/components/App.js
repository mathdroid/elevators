import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const time = Date.now()
    return (
      <div>
        It is {time}
      </div>
    )
  }
}

App.propTypes = {
}

function mapStateToProps(state) {

  return {}
}

export default App
