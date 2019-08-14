import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native'
import { Overlay } from 'teaset'

import StatusBar from '../components/StatusBar'

export default class Example5 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      selectedItem: null
    }
    this.Items = [
      "Aged Pu'er",
      'Bohea',
      'Chrysanthemum Chrysanthemum Chrysanthemum Chrysanthemum Chrysanthemum Chrysanthemum Chrysanthemum Chrysanthemum',
      '0000000000000000000000000000000000000000000000000000000123456',
      'Jasmine',
      'Keemun',
      'Loungjing',
      'Pekoe',
      'Tieguanyin'
    ]
  }

  // 页面初始
  componentWillMount () {
    console.log('componentWillMount Example5')
  }

  componentDidMount () {
    console.log(' componentDidMountExample5')
  }

  onItemPress (itemIndex) {
    console.log(itemIndex)
  }

  show (Items) {
    let overlayViewKey = null
    let overlayView = (
      <Overlay.PullView
        overlayOpacity={0.2}
        side="bottom"
        ref={v => (this.overlayPullView = v)}
      >
        <View
          style={{
            backgroundColor: '#fff',
            maxHeight: 258
          }}
        >
          <View
            style={{
              padding: 10
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>
              Select Items
            </Text>
          </View>
          <View style={{ backgroundColor: '#eee', height: 10 }} />
          <ScrollView
            style={{
              backgroundColor: '#fff',
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            {Items &&
              Items.map((item, index) => (
                <TouchableOpacity
                  key={'item' + index}
                  style={{
                    paddingBottom: 10
                  }}
                  onPress={() => {
                    this.onItemPress(index)
                    Overlay.hide(overlayViewKey)
                    overlayViewKey = null
                  }}
                >
                  {index !== 0 && (
                    <View style={{ backgroundColor: '#eee', height: 1 }} />
                  )}
                  <Text
                    style={{
                      color: '#232323',
                      paddingTop: 10
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </Overlay.PullView>
    )
    overlayViewKey = Overlay.show(overlayView)
  }

  render () {
    let { selectedItem } = this.state
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={{ paddingTop: 20 }}>
          <Text style={{ fontSize: 15, color: 'black' }}>{selectedItem}</Text>
          <TouchableOpacity onPress={() => this.show(this.Items)}>
            <Text style={{ fontSize: 15, color: 'black' }}>点击下拉框</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
