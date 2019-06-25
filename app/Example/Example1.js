import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import api from '../api/api';
import StatusBar from '../components/StatusBar';

export default class Example1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  // 页面初始
  componentWillMount() {}
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let dataSource = [
      { title: '数据测试1', id: '1000' },
      { title: '数据测试2', id: '1001' },
    ];
    let res = await api.mock(dataSource);
    this.setState({
      dataSource: res,
    });
  };

  _renderItems = ({ item, index }) => (
    <View style={{}}>
      <Text style={{ fontSize: 15, color: 'black' }}>{item.title}</Text>
    </View>
  );
  _keyExtractor = (item, index) => item.id;
  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          data={dataSource}
          extraData={dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
