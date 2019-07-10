import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import api from '../api/api';
import StatusBar from '../components/StatusBar';
import FlatListView from '../libs/FlatList';

class Example7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: '头部',
    };
  }

  // 页面初始
  componentWillMount() {}
  componentDidMount() {
    this.mounted = true;
    this.fetchData();
    this.page = 0;
  }

  fetchData = async () => {
    let res = await api.mock([
      { name: '1', id: '101' },
      { name: '2', id: '102' },
      { name: '3', id: '103' },
      { name: '4', id: '104' },
      { name: '5', id: '105' },
      { name: '6', id: '106' },
    ]);
    this._flatList && this._flatList.firstAddData(res);
  };

  _keyExtractor = (item, index) => 'key-' + index + item.id;
  /** 刷新下拉推荐 */
  _setRefreshing = refreshing => {
    this.refreshing = refreshing;
  };
  _setRefresh = async (startFetch, abortFetch) => {
    let res = await api.mock([
      { name: '1', id: '101' },
      { name: '2', id: '102' },
      { name: '3', id: '103' },
      { name: '4', id: '104' },
      { name: '5', id: '105' },
      { name: '6', id: '106' },
      { name: '7', id: '107' },
      { name: '8', id: '108' },
      { name: '9', id: '109' },
      { name: '10', id: '110' },
      { name: '11', id: '111' },
      { name: '12', id: '112' },
      { name: '13', id: '113' },
      { name: '14', id: '114' },
      { name: '15', id: '115' },
    ]);
    this.setState({
      headerText: '这是头部',
    });
    startFetch(res);
    this.page = 0;
  };
  _setEndReached = async (startFetch, abortFetch) => {
    if (this.page === 1) {
      startFetch([]);
      return false;
    }
    let res = await api.mock([
      { name: '16', id: '116' },
      { name: '17', id: '117' },
    ]);
    this.setState({
      headerText: '这是头部2',
    });
    startFetch(res);
    this.page = 1;
  };

  _renderItem = ({ item, index }) => {
    let key = '_renderItem-' + index;
    return <RenderItems key={key} data={item} />;
  };

  _HeaderView = () => {
    let { headerText } = this.state;
    return <HeaderView headerText={headerText} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatListView
          style={{ flex: 1 }}
          initialNumToRender={15}
          // ItemSeparatorComponent={null}
          ref={ref => (this._flatList = ref)}
          renderItem={this._renderItem}
          notRefresh={true}
          refreshable={true}
          setRefreshing={this._setRefreshing}
          setRefresh={this._setRefresh}
          setEndReached={this._setEndReached}
          keyExtractor={this._keyExtractor}
          HeaderView={this._HeaderView}
          refreshableTitle="下拉刷新"
          allLoadedText="没有更多数据"
          waitingSpinnerText="加载中..."
          paginationBtnText="加载更多..."
        />
      </View>
    );
  }
}

class HeaderView extends React.PureComponent {
  render() {
    let { headerText } = this.props;
    console.log('headerText: ', headerText);
    return (
      <View
        style={{
          backgroundColor: 'red',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, color: 'black' }}>{headerText}</Text>
      </View>
    );
  }
}

class RenderItems extends React.PureComponent {
  render() {
    let { data } = this.props;
    return (
      <View
        style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontSize: 15, color: 'black' }}>{data.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Example7;
