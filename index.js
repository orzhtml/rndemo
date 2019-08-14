/**
 * @format
 */
import React from 'react'
import { AppRegistry, YellowBox } from 'react-native'

import './app/common/Global'
import App from './App'
import { name as appName } from './app.json'

class rndemo extends React.Component {
  render () {
    return <App />
  }
}

YellowBox.ignoreWarnings([
  'Require cycle:',
  'Warning: Expected instance props to match',
  'Warning: ViewPagerAndroid has been extracted from react-native core and will be removed in a future release.',
  'Warning: Slider has been extracted from react-native core and will be removed in a future release.',
  'Warning: Async Storage has been extracted from react-native core and will be removed in a future release.'
])

AppRegistry.registerComponent(appName, () => rndemo)
