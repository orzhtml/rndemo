/**
 * Created by carson on 2018/1/12.
 */
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log('global.status_h: ', global.status_h)
  }

  render() {
    const { backgroundColor } = this.props;
    return (
      <MyStatusBar
        backgroundColor={backgroundColor ? backgroundColor : '#ffffff'}
        barStyle="dark-content"
      />
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: global.status_h,
  },
});
