import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import htmlparser2 from 'htmlparser2';
import entities from 'entities';
import Video from 'react-native-video';
import { ActionPopover } from 'teaset';

import { setSpText, scaleSize } from './SetSize';
import * as util from './util';
import HTMLImage from './HTMLImage';

const defaultOpts = {
  lineBreak: '\n',
  paragraphBreak: '\n\n',
  bullet: '\u2022 ',
};

const styles = StyleSheet.create({
  mt: {
    marginTop: scaleSize(10),
  },
  smallest: {
    fontSize: setSpText(16),
    lineHeight: scaleSize(23),
    letterSpacing: 2,
  },
  small: {
    fontSize: setSpText(17),
    lineHeight: scaleSize(25),
    letterSpacing: 2,
  },
  normal: {
    fontSize: setSpText(18),
    lineHeight: scaleSize(27),
    letterSpacing: 2,
  },
  big: {
    fontSize: setSpText(19),
    lineHeight: scaleSize(28.5),
    letterSpacing: 2,
  },
  largest: {
    fontSize: setSpText(20),
    lineHeight: scaleSize(30),
    letterSpacing: 2,
  },
});

export default function htmlToElement(rawHtml, customOpts = {}, done) {
  const opts = {
    ...defaultOpts,
    ...customOpts,
  };
  // 操作气泡
  function showActionPopover({ view, content }) {
    if (!opts.popover || opts.popover.length <= 0) {
      return false;
    }
    view.measure((x, y, width, height, pageX, pageY) => {
      let items = [];
      opts.popover.map(item => {
        items.push({
          title: item.title,
          onPress: () => {
            item.onPress &&
              item.onPress({
                type: item.type,
                title: item.title,
                content,
              });
          },
        });
      });
      ActionPopover.show({ x: pageX, y: pageY, width, height }, items);
    });
  }
  // dom 转 rn
  function domToElement(dom, parent) {
    if (!dom) return null;
    return dom.map((node, index, list) => {
      let NodeComponent = null;

      if (node.type === 'text') {
        if (checkSpace(node.data)) {
          return null;
        }
        let ShareNewsTextParagraphRand = util.MathRand(6);
        return (
          <Text
            ref={v =>
              (this[
                'ShareNewsTextParagraph' + index + ShareNewsTextParagraphRand
              ] = v)
            }
            key={index}
            style={[styles[opts.size], styles.mt]}
            onLongPress={() => {
              let text = entities.decodeHTML(node.data);
              // 长按
              opts.onLongPress && opts.onLongPress(text);
              // 长按显示弹窗
              showActionPopover({
                view: this[
                  'ShareNewsTextParagraph' + index + ShareNewsTextParagraphRand
                ],
                content: text,
              });
            }}
          >
            {entities.decodeHTML(node.data)}
          </Text>
        );
      }

      if (node.type === 'tag') {
        switch (node.name) {
          case 'br':
            if (
              parent.name === 'span' ||
              parent.name === 'strong' ||
              parent.name === 'a'
            ) {
              NodeComponent = <Text key={index}>{opts.paragraphBreak}</Text>;
            } else {
              NodeComponent = <View key={index} style={{ height: 10 }} />;
            }
            break;
          case 'img':
            NodeComponent = (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  opts.onImagePress(node.attribs.src);
                }}
                style={styles.mt}
              >
                <HTMLImage
                  source={{ uri: node.attribs.src }}
                  imagesMaxWidth={opts.imgMaxW}
                />
              </TouchableOpacity>
            );
            break;
          case 'span':
          case 'strong':
          case 'a':
            let isStrong = node.name === 'strong';
            let ShareNewsTagParagraphRand = util.MathRand(7);
            NodeComponent = (
              <Text
                ref={v =>
                  (this[
                    'ShareNewsTagParagraph' + index + ShareNewsTagParagraphRand
                  ] = v)
                }
                key={index}
                style={[
                  styles[opts.size],
                  {
                    fontWeight: isStrong ? 'bold' : 'normal',
                  },
                ]}
                onLongPress={() => {
                  let text = lineLabelMap(node.children);
                  // 长按
                  opts.onLongPress && opts.onLongPress(text);
                  // 长按显示弹窗
                  showActionPopover({
                    view: this[
                      'ShareNewsTagParagraph' +
                        index +
                        ShareNewsTagParagraphRand
                    ],
                    content: text,
                  });
                }}
              >
                {labelTextView(node.children, node)}
              </Text>
            );
            break;
          case 'p':
            if (util.checkIsTag(node.children)) {
              NodeComponent = domToElement(node.children, node);
            } else {
              let ShareNewsTagPParagraphRand = util.MathRand(8);
              NodeComponent = (
                <View key={index} style={[styles.mt]}>
                  <Text
                    ref={v =>
                      (this[
                        'ShareNewsTagPParagraph' +
                          index +
                          ShareNewsTagPParagraphRand
                      ] = v)
                    }
                    style={[styles[opts.size]]}
                    onLongPress={() => {
                      let text = lineLabelMap(node.children);
                      // 长按
                      opts.onLongPress && opts.onLongPress(text);
                      // 长按显示弹窗
                      showActionPopover({
                        view: this[
                          'ShareNewsTagPParagraph' +
                            index +
                            ShareNewsTagPParagraphRand
                        ],
                        content: text,
                      });
                    }}
                  >
                    {labelTextView(node.children, node)}
                  </Text>
                </View>
              );
            }
            break;
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            let fontSize = 12;
            if (node.name === 'h1') {
              fontSize = 22;
            } else if (node.name === 'h2') {
              fontSize = 20;
            } else if (node.name === 'h3') {
              fontSize = 18;
            } else if (node.name === 'h4') {
              fontSize = 16;
            } else if (node.name === 'h5') {
              fontSize = 14;
            }
            let ShareNewsTagHParagraphRand = util.MathRand(5);
            NodeComponent = (
              <Text
                ref={v =>
                  (this[
                    'ShareNewsTagHParagraph' +
                      index +
                      ShareNewsTagHParagraphRand
                  ] = v)
                }
                key={index}
                onLongPress={() => {
                  let text = lineLabelMap(node.children);
                  // 长按
                  opts.onLongPress && opts.onLongPress(text);
                  // 长按显示弹窗
                  showActionPopover({
                    view: this[
                      'ShareNewsTagHParagraph' +
                        index +
                        ShareNewsTagHParagraphRand
                    ],
                    content: text,
                  });
                }}
                style={[{ fontSize: fontSize, fontWeight: '700' }, styles.mt]}
              >
                {labelTextView(node.children, node)}
              </Text>
            );
            break;
          case 'video':
            NodeComponent = (
              <View key={index} style={{ minHeight: 340 }}>
                <Video
                  controls={node.attribs.controls === 'controls'}
                  // poster={node.attribs.poster}
                  source={{ uri: node.attribs.src }} // Can be a URL or a local file.
                  style={{ flex: 1 }}
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
              </View>
              // <Video
              //   key={index}
              //   controls={node.attribs.controls === 'controls'}
              //   source={{ uri: node.attribs.src }} // Can be a URL or a local file.
              //   style={[{ flex: 1, minHeight: 300 }, styles.mt]}
              //   paused={true}
              // />
            );
            break;
          case 'mark':
            NodeComponent = (
              <View
                key={index}
                style={[styles.mt, util.inheritedStyle(node.attribs.style)]}
              >
                {node.children.map((item, idx) => {
                  if (item.name === 'author') {
                    return (
                      <View
                        key={idx}
                        style={[{ alignItems: 'flex-end' }, styles.mt]}
                      >
                        <Text
                          style={[
                            styles[opts.size],
                            util.inheritedStyle(item.attribs.style),
                          ]}
                        >
                          {entities.decodeHTML(item.children[0].data)}
                        </Text>
                      </View>
                    );
                  }
                  let ShareNewsTagMarkParagraphRand = util.MathRand(4);
                  return (
                    <View key={idx}>
                      <Text
                        ref={v =>
                          (this[
                            'ShareNewsTagMarkParagraph' +
                              index +
                              ShareNewsTagMarkParagraphRand
                          ] = v)
                        }
                        style={[
                          styles[opts.size],
                          util.inheritedStyle(item.attribs.style),
                        ]}
                        onPress={() => {
                          let text = entities.decodeHTML(item.children[0].data);
                          opts.onMarkPress && opts.onMarkPress(text);
                        }}
                        onLongPress={() => {
                          let text = entities.decodeHTML(item.children[0].data);
                          // 长按
                          opts.onLongPress && opts.onLongPress(text);
                          // 长按显示弹窗
                          showActionPopover({
                            view: this[
                              'ShareNewsTagMarkParagraph' +
                                index +
                                ShareNewsTagMarkParagraphRand
                            ],
                            content: text,
                          });
                        }}
                      >
                        {entities.decodeHTML(item.children[0].data)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
            break;
          default:
            NodeComponent = (
              <View key={index} style={[styles.mt]}>
                {domToElement(node.children, node)}
              </View>
            );
        }

        return NodeComponent;
      }
    });
  }
  // 循环嵌套 text
  function labelTextView(dom, parent) {
    return dom.map((item, index) => {
      if (item.type === 'text') {
        let isStrong = parent.name === 'strong';
        return (
          <Text
            key={index}
            style={[
              styles[opts.size],
              {
                fontWeight: isStrong ? 'bold' : 'normal',
              },
            ]}
          >
            {entities.decodeHTML(item.data)}
          </Text>
        );
      } else if (item.type === 'tag') {
        if (item.name !== 'br' && item.name !== 'img') {
          return labelTextView(item.children, item);
        }
      }
    });
  }
  // 循环读取 文本内容
  function lineLabelMap(dom) {
    let textArray = [];
    dom.map(item => {
      textArray.push(labelText(item));
    });
    return entities.decodeHTML(textArray.join(',').replace(/,/g, ''));
  }
  // 返回文本内容
  function labelText(dom) {
    if (dom.type === 'text') {
      return dom.data;
    } else if (dom.type === 'tag') {
      if (dom.name !== 'br' && dom.name !== 'img') {
        return dom.children.map(item => {
          return labelText(item);
        });
      }
    }
  }
  // 检查空格
  function checkSpace(text) {
    let isSpace = false;
    if (entities.decodeHTML(text).replace(/[\s\r\n]/g, '') === '') {
      isSpace = true;
    }
    return isSpace;
  }
  const handler = new htmlparser2.DomHandler((err, dom) => {
    if (err) done(err);
    done(null, domToElement(dom));
    if (opts.debug) {
      console.log('DOMNodes from htmlparser2', dom);
    }
  });
  const parser = new htmlparser2.Parser(handler, {
    decodeEntities: true,
  });
  parser.write(rawHtml ? util.resetHtml(rawHtml) : '');
  parser.done();
}
