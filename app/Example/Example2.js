import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import api from '../api/api';
import StatusBar from '../components/StatusBar';

class Example2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isload: false,
      dataSource: null,
      keyboard: '拼',
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
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
      {
        news_id: '111654',
        source: '腾讯深度',
        title: '年亏百亿！拼多多、滴滴、美团亏损大比拼，拼烧钱能烧出未来吗？',
        time: '1550116907',
      },
      {
        news_id: '110895',
        source: '界面',
        title: '制造拼多多阿姨',
        time: '1549931400',
      },
      {
        news_id: '110037',
        source: '界面',
        title: '快看 | 拼多多美股后续发行最终定价25美元',
        time: '1549638900',
      },
      {
        news_id: '109748',
        source: '東森新聞',
        title: '拼上市以來股價漲60%「逼近京東」　拼多多新融資超過10億美元！拼',
        time: '1549513740',
      },
      {
        news_id: '109678',
        source: '腾讯深度',
        title: '拼标普500终结五连涨！美股小幅收跌，拼多多大跌近8%',
        time: '1549487429',
      },
      {
        news_id: '109679',
        source: '腾讯深度',
        title: '标普500终结拼五连涨！美股小幅收跌，大跌近8%拼多多',
        time: '1549487429',
      },
    ];
    let res = await api.mock(dataSource);
    this.setState({
      dataSource: res,
    });
  };

  _renderItems = (item, index) => {
    const key = 'itm-' + index;
    const { keyboard } = this.state;
    return <RenderItems key={key} item={item} keyboard={keyboard} />;
  };

  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Main')}
          >
            <Text style={{ fontSize: 15, color: 'black' }}>返回首页</Text>
          </TouchableOpacity>
          {
            dataSource && dataSource.map((item, index) => {
              return this._renderItems(item, index);
            })
          }
        </ScrollView>
      </View>
    );
  }
}

class RenderItems extends React.PureComponent {
  render() {
    let { keyboard, item } = this.props;
    let txtArr = item.title.split(keyboard);

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={{ fontSize: 15, color: 'black' }}>
            {txtArr.map((itm, idx) => {
              let arr = [];
              let k = 'title-' + idx;
              arr.push(itm);
              if (txtArr.length - 1 != idx) {
                arr.push(
                  <Text key={k} style={{ fontSize: 15, color: 'red' }}>
                    {keyboard}
                  </Text>,
                );
              }
              return arr;
            })}
          </Text>
        </View>
        <Text style={{ fontSize: 15, color: 'black' }}>
          {item.time + ' ' + item.source}
        </Text>
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

export default Example2;
