import React from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';

import api from '../api/api';
import StatusBar from '../components/StatusBar';
import FlatListView from '../libs/FlatList';

class Example7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerText: '最新推荐成功',
      refreshing: false,
    };
    this.textIndex = 0;
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
      { name: '01', id: '101' },
      { name: '02', id: '102' },
      { name: '03', id: '103' },
      { name: '04', id: '104' },
      { name: '05', id: '105' },
      { name: '06', id: '106' },
      { name: '07', id: '107' },
      { name: '08', id: '108' },
    ]);
    this._flatList && this._flatList.firstAddData(res);
  };

  _setRefresh = async (startFetch, abortFetch) => {
    this.setState({
      refreshing: true,
    });
    let res = await api.mock([
      { name: '01', id: '101' },
      { name: '02', id: '102' },
      { name: '03', id: '103' },
      { name: '04', id: '104' },
      { name: '05', id: '105' },
      { name: '06', id: '106' },
      { name: '07', id: '107' },
      { name: '08', id: '108' },
      { name: '09', id: '109' },
      { name: '10', id: '110' },
      { name: '11', id: '111' },
      { name: '12', id: '112' },
    ]);
    this.setState({
      headerText: `本次推荐 ${res.length} 条更新 - ${this.textIndex}`,
      refreshing: false,
    });
    startFetch(res);
    this.page = 0;
    this.textIndex++;
  };
  _setEndReached = async (startFetch, abortFetch) => {
    if (this.page === 1) {
      startFetch([]);
      return false;
    }
    let res = await api.mock([
      { name: '13', id: '113' },
      { name: '14', id: '114' },
      { name: '15', id: '115' },
      { name: '16', id: '116' },
      { name: '17', id: '117' },
    ]);
    startFetch(res);
    this.page = 1;
  };

  _renderItem = ({ item, index }) => {
    let key = '_renderItem-' + index;
    return <RenderItems key={key} data={item} />;
  };

  _AnimatedHeaderView = () => {
    let { headerText, refreshing } = this.state;
    return (
      <AnimatedHeaderView headerText={headerText} refreshing={refreshing} />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="red" />
        <FlatListView
          style={{ flex: 1 }}
          initialNumToRender={12}
          // ItemSeparatorComponent={null}
          ref={ref => (this._flatList = ref)}
          renderItem={this._renderItem}
          // notRefresh={true}
          HeaderView={this._AnimatedHeaderView}
          refreshable={true}
          setRefresh={this._setRefresh}
          setEndReached={this._setEndReached}
          refreshableTitle="下拉刷新"
          allLoadedText="没有更多数据"
          waitingSpinnerText="加载中..."
          paginationBtnText="加载更多..."
        />
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

class AnimatedHeaderView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.spinWidthValue = new Animated.Value(0);
    this.spinHeightValue = new Animated.Value(0);
    this.timer = null;
    this.state = {
      height: 0,
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    let { refreshing } = this.props;
    if (refreshing === nextProps.refreshing) {
      return false;
    }
    if (!nextProps.refreshing) {
      this._start();
    }
  }
  componentWillUnmount() {
    this._stopTimer();
  }
  _start = () => {
    this.spinWidthValue.setValue(0);
    this.spinHeightValue.setValue(0);
    this._stopTimer();

    this.setState({
        height: 34,
      }, () => {
        Animated.timing(this.spinWidthValue, {
          toValue: 1,
          duration: 300,
          easing: Easing.inOut(Easing.linear),
        }).start(() => {
          this.timer = setTimeout(() => {
            Animated.timing(this.spinHeightValue, {
              toValue: 1,
              duration: 200,
              easing: Easing.inOut(Easing.linear),
            }).start();
            this.setState({
              height: this.spinHeightValue.interpolate({
                inputRange: [0, 1],
                outputRange: [34, 0],
              }),
            });
          }, 1000);
        });
      },
    );
  };
  _stopTimer = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  };
  render() {
    let { headerText } = this.props;
    let { height } = this.state;

    const width = this.spinWidthValue.interpolate({
      inputRange: [0, 1],
      outputRange: [100, global.sw],
    });

    return (
      <Animated.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          height,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: '#d6e9f7',
            justifyContent: 'center',
            alignItems: 'center',
            height: 34,
            width,
          }}
        >
          <Text style={{ fontSize: 12, color: '#3289bf' }}>{headerText}</Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Example7;
