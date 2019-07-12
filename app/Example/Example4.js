import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import HTMLView from 'react-native-htmlview';
import Video from 'react-native-video';

import StatusBar from '../components/StatusBar';
import { BaseComponent, BusinessComponent } from '../common/Component';
import HTMLImage from '../libs/HTMLImage';

export default class Example4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    let htmlSource =
      '<p><span>测试数据文本</span><span>测试数据文本测试数据文本2</span></p>';
    htmlSource += '<mark>';
    htmlSource +=
      '<span style="color: red">朝鲜大型团体操和艺术演出《人民的国家》6月3日晚在平壤五一体育场举行首场表演，朝鲜最高领导人金正恩和数万名观众观看。</span>';
    htmlSource +=
      '<author id="abscasd" style="color: #f0f;">——kavt 标注</author>';
    htmlSource += '</mark>';
    htmlSource += '<div class="content-container"><!--content-container-->';
    htmlSource += '<div class="main-container"><!--main-->';
    htmlSource += '<div class="article-view">';
    htmlSource +=
      '<div class="article-header"><h1>航海王巡展亮相上海，值得粉丝去打卡吗？</h1></div>';
    htmlSource += '<div class="video-view">';
    htmlSource +=
      '<div class="video-main" id="gddflvplayer" style="height:380px;">';
    htmlSource +=
      '<video src="https://kavt.oss-cn-shanghai.aliyuncs.com/VIDEO/1.mp4" controls="controls" poster="https://img3.jiemian.com/101/original/20190603/155956386599084700.jpg" webkit-playsinline style="width:100%;max-height:100%;"></video>';
    htmlSource += '</div>';
    htmlSource +=
      '\r\n\r\n\r\n\r\n\r\n航海王巡展亮相上海，值得粉丝去打卡吗？\r\n\r\n\r\n';
    htmlSource +=
      '<p>新华社报道说，在一个半小时的演出中，数万名朝鲜演员通过体操、舞蹈、声乐、杂技等形式多样的表演，展现出朝鲜革命与战争、政治和军队建设、民生与经济发展以及对外交往等历史画卷，赢得观众的热烈掌声。</p>';
    htmlSource +=
      '\r\n\r\n<p>按照朝中社6月4日报道的描述，“表演者以美丽优雅的律动、充满气魄的体操、丰富的民族情趣和艺术形象、千变万化的大规模背景台画幅为观众奉献了一场文艺盛宴。”演出结束时，全体表演者和观众再次向金正恩爆发出“万岁！”</p>';
    htmlSource +=
      '\r\n\r\n\r\n<img style="width:100px;height:50px;" src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946291-5a4c893e552f2f6bbb62abc6ec7ed72a.jpg">';
    htmlSource += '\r\n图片来源：朝中社\r\n\r\n\r\n\r\n';
    htmlSource +=
      '<p>不过朝中社称，演出结束后，金正恩召见大型团体操与艺术表演主创人员，“指点作品内容和形式中存在的缺点，对他们错误的创作作风、不负责任的工作态度提出严厉批评”。</p>';
    htmlSource +=
      '\r\n\r\n<p>金正恩说，文艺部门创作家和艺术家在社会主义文化建设中肩负的任务非常重要，并就正确地执行贯彻党的革命性文艺政策提出了重要任务。</p>';
    htmlSource +=
      '<p class="report-view"><img src="https://kavt.oss-cn-shanghai.aliyuncs.com/caiji/946291-79f84ef8941a146fc915c3da74ee4c0d.jpg"></p>';
    htmlSource +=
      '\r\n\r\n<p>朝鲜有组织举行大型团体操的传统，曾以参演人数载入吉尼斯世界纪录的大型团体操《阿里郎》是朝鲜团体操的代表作之一。';
    htmlSource +=
      '2018年，朝鲜为庆祝建国70周年打造了名为《辉煌的祖国》的大型团体操和艺术演出，反映朝鲜建国以来在各领域取得的成就。</p>';
    htmlSource +=
      '\r\n\r\n<p>6月3日的活动中，金正恩胞妹、朝鲜劳动党中央委员会第一副部长金与正陪同观看了表演。此外，劳动党副委员长金英哲当天也现身观演。</p>';
    htmlSource +=
      '\r\n\r\n<p>此前曾有韩国媒体报道说，为追究越南河内金特会无果而终的责任，“金与正被勒令停职反省”，金英哲“被肃清”、接受“劳改”，';
    htmlSource +=
      '而两人的现身让这些传言不攻自破。6月2日，金英哲还陪同金正恩一同观看了朝鲜人民军第二届第七次军属艺术小组竞赛获奖节目演出。</p>';

    this.htmlSource = htmlSource;
  }
  // 页面初始
  componentWillMount() {
    console.log('componentWillMount Example4');
  }
  componentDidMount() {
    console.log('componentDidMount Example4');
  }
  /** 处理 html */
  _renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.type === 'text') {
      return this._nodeText(node.data);
    } else if (node.type === 'tag') {
      if (node.name === 'br') {
        let randBr = BaseComponent.MathRand(4);
        return <View key={node.name + '-' + randBr} style={{ height: 10 }} />;
      } else if (node.name === 'img') {
        let randImg = BaseComponent.MathRand(5);
        return (
          <TouchableOpacity
            key={node.name + '-' + randImg}
            onPress={() => {
              console.log(node.attribs.src);
            }}
          >
            <HTMLImage
              source={{ uri: node.attribs.src }}
              imagesMaxWidth={global.sw - 30}
            />
          </TouchableOpacity>
        );
      } else if (
        node.name === 'strong' ||
        node.name === 'span' ||
        node.name === 'a'
      ) {
        return node.children.map(item => {
          let rand = BaseComponent.MathRand(6);
          return (
            <Text
              key={node.name + '-' + rand}
              ref={v => (this['nodeTextShare-' + rand] = v)}
              onLongPress={() => {
                console.log(item.data);
              }}
              style={BusinessComponent.inheritedStyle(node.attribs.style)}
            >
              {item.data}
            </Text>
          );
        });
      } else if (node.name === 'p' || node.name === 'div') {
        return this._nodeView(node);
      } else if (
        node.name === 'h1' ||
        node.name === 'h2' ||
        node.name === 'h3' ||
        node.name === 'h4' ||
        node.name === 'h5' ||
        node.name === 'h6'
      ) {
        let fontSize = 18;
        if (node.name === 'h5') {
          fontSize = 14;
        } else if (node.name === 'h6') {
          fontSize = 12;
        }
        return node.children.map(item => {
          let rand = BaseComponent.MathRand(6);
          return (
            <Text
              key={node.name + '-' + rand}
              ref={v => (this['nodeTextShare-' + rand] = v)}
              onLongPress={() => {
                console.log(item.data);
              }}
              style={[
                {
                  fontWeight: '700',
                  fontSize,
                },
                BusinessComponent.inheritedStyle(node.attribs.style),
              ]}
            >
              {item.data}
            </Text>
          );
        });
      } else if (node.name === 'video') {
        let randVideo = BaseComponent.MathRand(4);
        return (
          <Video
            key={node.name + '-' + randVideo}
            controls={node.attribs.controls === 'controls'}
            // poster={node.attribs.poster}
            source={{ uri: node.attribs.src }} // Can be a URL or a local file.
            style={[
              { flex: 1 },
              BusinessComponent.inheritedStyle(node.attribs.style),
            ]}
            paused={true}
            // ref={ref => {
            //   this.player = ref;
            // }} // Store reference
            onBuffer={e => {
              console.log('onBuffer: ', e);
            }} // Callback when remote video is buffering
            onError={e => {
              console.log('onError: ', e);
            }} // Callback when video cannot be loaded
          />
        );
      } else if (node.name === 'mark') {
        let randMark = BaseComponent.MathRand(4);
        return (
          <View
            key={node.name + '-' + randMark}
            style={{
              marginTop: 10,
            }}
          >
            {node.children.map(item => {
              let randItem = BaseComponent.MathRand(4);
              console.log('item: ', item);
              if (item.name === 'author') {
                return (
                  <View
                    key={item.name + '-' + randItem}
                    style={{ alignItems: 'flex-end' }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item.attribs.id);
                      }}
                    >
                      <Text
                        style={BusinessComponent.inheritedStyle(
                          item.attribs.style,
                        )}
                      >
                        {item.children[0].data}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
              return (
                <Text
                  key={item.name + '-' + randItem}
                  style={BusinessComponent.inheritedStyle(item.attribs.style)}
                  onLongPress={() => {
                    console.log(item.children[0].data);
                  }}
                >
                  {item.children[0].data}
                </Text>
              );
            })}
          </View>
        );
      }
    }
    return null;
  };
  _nodeView = node => {
    let rand = BaseComponent.MathRand(7);
    let children = node.children[0];
    let htmlArray = [];
    if (children.type === 'tag') {
      if (
        children.name === 'strong' ||
        children.name === 'span' ||
        children.name === 'a'
      ) {
        htmlArray.push(
          <Text key={node.name + '-text-' + rand}>
            {node.children.map(item => {
              return this._renderNode(item);
            })}
          </Text>,
        );
      } else {
        htmlArray.push(
          node.children.map(item => {
            return this._renderNode(item);
          }),
        );
      }
    } else if (children.type === 'text') {
      htmlArray.push(this._nodeText(node.children[0].data));
    } else {
      htmlArray.push(null);
    }

    return (
      <View
        key={node.name + '-View-' + rand}
        style={[
          {
            marginTop: 10,
          },
          BusinessComponent.inheritedStyle(node.attribs.style),
        ]}
      >
        {htmlArray}
      </View>
    );
  };
  _nodeText = text => {
    let rand = BaseComponent.MathRand(8);
    return (
      <Text
        key={'nodeText-' + rand}
        ref={v => (this['nodeTextShare-' + rand] = v)}
        onLongPress={() => {
          console.log(text);
        }}
        style={styles.lineText}
      >
        {text}
      </Text>
    );
  };
  render() {
    const imgArray = [];
    const html = this.htmlSource
      .replace(/[\r\n]/g, '')
      .replace(/<br>\s*<\/br>/g, '<br/>')
      .replace(/<br><\/br>/g, '<br/>')
      .replace(/<p><br><\/p>/g, '<br/>')
      .replace(/<p><\/p>/g, '<br/>')
      .replace(/<div><\/div>/g, '<br/>')
      .replace(/<div><br><\/div>/g, '<br/>')
      .replace(/<!--[^>]*?-->/g, '');
    html.replace(/<img.+?src="([^"]+)/g, (_, url) => {
      imgArray.push({
        url,
      });
    });
    return (
      <View style={styles.container}>
        <StatusBar />
        <ScrollView style={styles.container}>
          <Text style={{ fontSize: 15, color: 'black' }}>xxxxxsadadsa</Text>
          {
            // <HTMLView value={html} renderNode={this._renderNode} />
          }
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
  lineText: {
    color: '#222',
    fontSize: 17,
    lineHeight: 27,
    letterSpacing: 2,
  },
});
