/** @format */
import React from "react";
import { AppRegistry, YellowBox } from "react-native";

import './app/common/Global';
import App from "./App";
import { name as appName } from "./app.json";

class rndemo extends React.Component {
  render() {
    return <App />;
  }
}

console.disableYellowBox = true;
YellowBox.ignoreWarnings(["Require cycle:", "Warning: isMounted(...)"]);

AppRegistry.registerComponent(appName, () => rndemo);
