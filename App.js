/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { View } from 'react-native'
import Routing from './app/Routing'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isload: false
    }
  }

  // 页面初始
  componentWillMount () {
    this.setState({
      isload: true
    })
  }

  componentDidMount () {}

  render () {
    let { isload } = this.state
    if (!isload) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff'
          }}
        />
      )
    }
    return <Routing />
  }
}

export default App
