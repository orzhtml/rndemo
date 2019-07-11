import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

import api from '../api/api';
import StatusBar from '../components/StatusBar';

const _BaseScript = `
  (function () {
    let height = null;
    function changeHeight() {
      if (document.body.scrollHeight != height) {
        height = document.body.scrollHeight;
        if (window.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'setHeight',
            height: height,
          }))
        }
      }
    }
    setTimeout(changeHeight, 300);
  })()
`;

export default class Example3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webHeight: 0,
      html: null,
    };
  }

  // 页面初始
  componentWillMount() {}

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let res = await api.mock(
      '<p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><p>测试内容</p><div class="video-view"><div class="video-main" id="gddflvplayer" style="height:380px;"><video src="https://kavt.oss-cn-shanghai.aliyuncs.com/VIDEO/1.mp4" controls="controls" poster="http://img3.jiemian.com/101/original/20190618/156083859733495100.jpg" webkit-playsinline style="width:100%;max-height:100%;"></video></div>',
    );
    this.setState({
      html: this._setHtml(res),
    });
  };

  _setHtml = html => {
    let htmlTemp = `
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui">
        <meta content="yes" name="apple-mobile-web-app-capable">
        <style>
        *,
        *:after,
        *:before {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            letter-spacing: 2px;
            word-wrap: break-word;
        }
        html {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        html, body{background-color: #fff; padding: 0; margin: 0;}
        body{
            font-size: 17px;
            line-height: 27px;
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
            outline: 0;
        }
        img{
            vertical-align: middle;
            border: 0;
            max-width: 99.9%;
            margin-bottom: 5px;
        }
        p {margin-top: 0;}
        </style>
        <div>
            ${html}
        </div>
    `;
    return htmlTemp;
  };

  onMessage = event => {
    try {
      const action = JSON.parse(event.nativeEvent.data);
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({
          webHeight: action.height,
        });
      }
    } catch (error) {
      // pass
    }
  };

  render() {
    const { html, webHeight } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <View style={{ height: 40 }}>
          <Text style={{ fontSize: 15, color: 'black' }}>
            ScrollView之外的内容1
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 40 }}>
            <Text style={{ fontSize: 15, color: 'black' }}>
              webview之外的内容
            </Text>
          </View>
          {html && (
            <WebView
              style={{
                height: webHeight,
                width: global.sw,
                marginTop: 10,
              }}
              allowsInlineMediaPlayback={true}
              source={{ html: html }}
              decelerationRate="normal"
              javaScriptEnabled
              domStorageEnabled
              onMessage={this.onMessage}
              injectedJavaScript={_BaseScript}
              originWhitelist={['*']}
              nativeConfig={{
                props: {
                  backgroundColor: '#ffffff',
                  flex: 1,
                },
              }}
            />
          )}
          <View style={{ height: 40 }}>
            <Text style={{ fontSize: 15, color: 'black' }}>
              webview之外的内容2
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
