import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'

import StatusBar from '../components/StatusBar'

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
)

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <ScrollView horizontal={true}>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
      <View style={{
        width: 50,
        height: 50,
        marginRight: 5
      }}>
        <Text style={{ fontSize: 15, color: 'black' }}>测试1</Text>
      </View>
    </ScrollView>
  </View>
)

const SecondRoute2 = () => (
  <View style={[styles.scene, { backgroundColor: '#f0f' }]} />
)

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route
const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
)

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
      { key: 'second2', title: 'Second2' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <TabView
          lazy
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            second2: SecondRoute2
          })}
          renderLazyPlaceholder={this._renderLazyPlaceholder}
          onIndexChange={this._handleIndexChange}
          style={styles.container}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
