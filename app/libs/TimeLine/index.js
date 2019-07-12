import React from 'react';
import { StyleSheet, Image, View, Text, FlatList } from 'react-native';

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data === nextProps.data) {
      return false;
    }
    this.setState({
      data: nextProps.data,
    });
  }

  _keyExtractor = (item, index) => 'item-' + index;

  _renderCircle = (item, index) => {
    let { circleSize } = this.props;
    let CircleView = null;

    if (item.iconType === 'dot') {
      CircleView = (
        <View
          style={[
            styles.CircleView,
            styles.CircleViewDot,
            { left: circleSize / 2 - (item.circleSize / 2 - 1) },
            item.iconColor
              ? {
                  backgroundColor: item.iconColor,
                }
              : null,
          ]}
        />
      );
    } else if (item.iconType === 'icon') {
      CircleView = (
        <Image
          source={item.icon}
          style={[
            styles.CircleView,
            styles.CircleViewIcon,
            {
              width: item.circleSize,
              height: item.circleSize,
            },
          ]}
        />
      );
    }
    return CircleView;
  };

  _renderTimeline = (item, index) => {
    let { circleSize, timeLineColor } = this.props;
    let timeLineStyle = {
      left: circleSize / 2,
      top: index === 0 ? 6 : 0,
    };
    if (timeLineColor) {
      timeLineColor = {
        backgroundColor: timeLineColor,
      };
    }
    return (
      <View
        style={[
          styles.timeLine,
          styles.timeLineColor,
          timeLineStyle,
          timeLineColor,
        ]}
      />
    );
  };

  _renderDetail = (item, index) => {
    let { circleSize, renderDetail } = this.props;
    if (renderDetail) {
      return renderDetail(item, index);
    }

    return (
      <View
        style={{
          marginLeft: circleSize ? circleSize + 14 : 15,
          paddingTop:
            item.iconType === 'icon' ? circleSize / 2 / 2 - global.p1 : 0,
        }}
      >
        <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
          {item.time}
          <Text
            style={{
              fontSize: 16,
              color: '#222',
            }}
          >
            {item.description}
          </Text>
        </Text>
        {this._renderSeparator(item, index)}
      </View>
    );
  };

  _renderSeparator = (item, index) => {
    let { separatorView } = this.props;
    if (separatorView) {
      return separatorView();
    }
    return <View style={styles.separator} />;
  };

  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          paddingBottom: 10,
        }}
      >
        {this._renderTimeline(item, index)}
        {this._renderCircle(item, index)}
        {this._renderDetail(item, index)}
      </View>
    );
  };

  render() {
    let { style } = this.props;
    let { data } = this.state;
    return (
      <FlatList
        ref={e => (this.TimeLine = e)}
        style={[styles.container, style]}
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  CircleView: {
    position: 'absolute',
  },
  CircleViewDot: {
    backgroundColor: '#FFAC00',
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
  timeLine: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: global.p1,
  },
  timeLineColor: {
    backgroundColor: '#FFAC00',
  },
  separator: {
    backgroundColor: '#FFAC00',
    height: global.p1,
    marginTop: 10,
  },
});

export default Timeline;
