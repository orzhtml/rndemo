import React from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const hairlineWidth = StyleSheet.hairlineWidth;

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    let { data } = this.props;
    if (data === nextProps.data) {
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
    let { circleSize, renderDetail, onPress } = this.props;
    if (renderDetail) {
      return renderDetail(item, index);
    }

    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.5 : 1}
        onPress={() => {
          onPress && onPress(item, index);
        }}
        style={{
          marginLeft: circleSize ? circleSize + 14 : 15,
          paddingTop:
            item.iconType === 'icon' ? circleSize / 2 / 2 - hairlineWidth : 0,
        }}
      >
        <Text style={styles.timeText}>
          {`${item.time}   `}
          <Text style={styles.descText}>{item.description}</Text>
        </Text>
        {this._renderSeparator(item, index)}
      </TouchableOpacity>
    );
  };

  _renderSeparator = (item, index) => {
    let { separatorView } = this.props;
    if (separatorView) {
      return separatorView(item, index);
    }
    return <View style={styles.separator} />;
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderItem}>
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

Timeline.defaultProps = {
  circleSize: null,
  timeLineColor: null,
  renderDetail: null,
  onPress: null,
  separatorView: null,
  style: null,
  data: [],
};

Timeline.propTypes = {
  circleSize: PropTypes.number,
  timeLineColor: PropTypes.string,
  renderDetail: PropTypes.func,
  onPress: PropTypes.func,
  separatorView: PropTypes.func,
  style: ViewPropTypes.style,
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderItem: {
    paddingBottom: 10,
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
    width: hairlineWidth,
  },
  timeLineColor: {
    backgroundColor: '#FFAC00',
  },
  separator: {
    backgroundColor: '#FFAC00',
    height: hairlineWidth,
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  descText: {
    fontSize: 16,
    color: '#222',
  },
});

export default Timeline;
