import React from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../Home';
import Example1 from '../Example/Example1';
import Example2 from '../Example/Example2';
import Example3 from '../Example/Example3';
import Example4 from '../Example/Example4';
import Example5 from '../Example/Example5';
import Example6 from '../Example/Example6';

const { width, height } = Dimensions.get('window');

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    webview: {
      screen: Example3,
      navigationOptions: {
        title: 'webview demo',
        gestureResponseDistance: {
          horizontal: width / 2,
        },
      },
    },
    HTMLView: {
      screen: Example4,
      navigationOptions: {
        title: 'HTMLView demo',
        gestureResponseDistance: {
          horizontal: width / 2,
        },
      },
    },
    Select: {
      screen: Example5,
      navigationOptions: {
        title: 'Select demo',
        gestureResponseDistance: {
          horizontal: width / 2,
        },
      },
    },
    htmlToRN: {
      screen: Example6,
      navigationOptions: {
        title: 'htmlToRN demo',
        gestureResponseDistance: {
          horizontal: width / 2,
        },
      },
    },
    TimeLine: {
      screen: Example1,
      navigationOptions: {
        title: 'TimeLine demo',
        gestureResponseDistance: {
          horizontal: width / 2,
        },
      },
    },
  },
  {
    initialRouteName: 'TimeLine',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: true,
      // headerStyle: {
      //   backgroundColor: "#f4511e"
      // },
      // headerTintColor: "#fff",
      // headerTitleStyle: {
      //   fontWeight: "bold"
      // }
    },
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: Example2,
      navigationOptions: {
        gesturesEnabled: true,
        gestureResponseDistance: {
          vertical: height - 100,
        },
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  },
);

const AppContainer = createAppContainer(RootStack);

export default class Routing extends React.Component {
  render() {
    return <AppContainer />;
  }
}
