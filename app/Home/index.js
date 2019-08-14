import React from 'react'
import { View } from 'react-native'
import { ListRow } from 'teaset'

import StatusBar from '../components/StatusBar'

class Home extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <ListRow
          title="TimeLine demo"
          onPress={() => this.props.navigation.navigate('TimeLine')}
        />
        <ListRow
          title="关键字高亮"
          onPress={() => this.props.navigation.navigate('KeyHighlight')}
        />
        <ListRow
          title="自定义 select"
          onPress={() => this.props.navigation.navigate('Select')}
        />
        <ListRow
          title="自定义 htmlToRN"
          onPress={() => this.props.navigation.navigate('htmlToRN')}
        />
        <ListRow
          title="react-native-webview demo"
          onPress={() => this.props.navigation.navigate('webview')}
        />
        <ListRow
          title="FlatList demo"
          onPress={() => this.props.navigation.navigate('FlatList')}
        />
        <ListRow
          title="tabView demo"
          onPress={() => this.props.navigation.navigate('tabView')}
        />
      </View>
    )
  }
}
export default Home
