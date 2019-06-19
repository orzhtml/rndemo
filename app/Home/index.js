import React from 'react';
import { View } from 'react-native';
import { ListRow } from 'teaset';

import StatusBar from '../components/StatusBar';

class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        {global.ios && (
          <ListRow
            title="react-native-tableview demo"
            onPress={() => this.props.navigation.navigate('sections')}
          />
        )}
        <ListRow
          title="关键字高亮"
          onPress={() => this.props.navigation.navigate('MyModal')}
        />
        <ListRow
          title="HTMLView"
          onPress={() => this.props.navigation.navigate('HTMLView')}
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
      </View>
    );
  }
}
export default Home;
