import { Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Images } from './Images';

// 系统是苹果
global.ios = Platform.OS === 'ios';
// 系统是安卓
global.and = Platform.OS === 'android';
// 获取屏幕宽度
global.sw = Dimensions.get('window').width;
// 获取屏幕高度
global.sh = Dimensions.get('window').height;
// 状态栏高度
global.status_h = global.ios
  ? getStatusBarHeight()
  : StatusBar.currentHeight;
// 最小线宽
global.p1 = StyleSheet.hairlineWidth
global.t = 'transparent';

global.Images = Images;