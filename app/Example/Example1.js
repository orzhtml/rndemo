import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import api from '../api/api';
import StatusBar from '../components/StatusBar';
import TimeLine from '../libs/TimeLine';

class Example1 extends React.Component {
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
      {
        time: '7:00',
        description: '出去吃饭',
        iconType: 'icon',
        icon: global.Images.icon.notes,
        circleSize: this.p2px(56),
      },
      {
        time: '9:00',
        description: '去看演唱会',
        iconType: 'dot',
        iconColor: '#FFAC00',
        circleSize: this.p2px(16),
      },
      {
        time: '12:00',
        description: '完成季度任务完成季度任务完成季度任务完成季度任务',
        iconType: 'dot',
        iconColor: '#FFAC00',
        circleSize: this.p2px(16),
      },
      {
        time: '14:00',
        description: '土耳其 vs 德国',
        iconType: 'icon',
        icon: global.Images.icon.sports,
        circleSize: this.p2px(56),
      },
      {
        time: '19:00',
        description: '《我不是药神》上映',
        iconType: 'icon',
        icon: global.Images.icon.time,
        circleSize: this.p2px(56),
      },
      {
        time: '7:00',
        description: '出去吃饭',
        iconType: 'icon',
        icon: global.Images.icon.notes,
        circleSize: this.p2px(56),
      },
      {
        time: '9:00',
        description: '去看演唱会',
        iconType: 'dot',
        iconColor: '#FFAC00',
        circleSize: this.p2px(16),
      },
      {
        time: '12:00',
        description: '完成季度任务完成季度任务完成季度任务完成季度任务',
        iconType: 'dot',
        iconColor: '#FFAC00',
        circleSize: this.p2px(16),
      },
      {
        time: '14:00',
        description: '土耳其 vs 德国',
        iconType: 'icon',
        icon: global.Images.icon.sports,
        circleSize: this.p2px(56),
      },
      {
        time: '19:00',
        description: '《我不是药神》上映',
        iconType: 'icon',
        icon: global.Images.icon.time,
        circleSize: this.p2px(56),
      },
      {
        time: '7:00',
        description: '出去吃饭',
        iconType: 'icon',
        icon: global.Images.icon.notes,
        circleSize: this.p2px(56),
      },
      {
        time: '9:00',
        description: '去看演唱会',
        iconType: 'dot',
        iconColor: '#FFAC00',
        circleSize: this.p2px(16),
      },
      {
        time: '12:00',
        description: '完成季度任务完成季度任务完成季度任务完成季度任务',
        iconType: 'dot',
        iconColor: '#FFAC00',
        circleSize: this.p2px(16),
      },
      {
        time: '14:00',
        description: '土耳其 vs 德国',
        iconType: 'icon',
        icon: global.Images.icon.sports,
        circleSize: this.p2px(56),
      },
      {
        time: '19:00',
        description: '《我不是药神》上映',
        iconType: 'icon',
        icon: global.Images.icon.time,
        circleSize: this.p2px(56),
      },
    ];
    let res = await api.mock(dataSource);
    this.setState({
      dataSource: res,
    });
  };

  p2px = num => {
    return Math.floor(num / 2);
  };

  _renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item, index);
        }}
        style={{
          marginLeft: this.p2px(56) + 14,
          paddingBottom: 10,
          paddingTop:
            item.iconType === 'icon' ? this.p2px(56) / 2 / 2 - global.p1 : 0,
        }}
      >
        <View
          style={{
            marginBottom: 4,
          }}
        >
          <Text style={{ fontSize: 14, color: '#666' }}>{item.time}</Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: '#222',
          }}
        >
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.container}>
          <TimeLine
            ref={e => (this.TimeLine = e)}
            style={{ paddingHorizontal: 20 }}
            data={dataSource}
            circleSize={this.p2px(56)}
            timeLineColor="#FFAC00"
            renderDetail={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  CircleView: {
    position: 'absolute',
  },
  CircleViewDot: {
    backgroundColor: 'red',
    borderRadius: 6,
    height: 6,
    width: 6,
    top: 6,
    left: 1,
  },
  CircleViewIcon: {
    left: 0,
    top: 0,
  },
  timeline: {
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: global.p1,
  },
});

export default Example1;
