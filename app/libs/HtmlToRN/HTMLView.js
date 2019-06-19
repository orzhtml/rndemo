import React from 'react';
import { Dimensions, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import htmlToElement from './htmlToElement';

const boldStyle = { fontWeight: 'bold' };
const fontSize = 'normal'; // 最小(smallest)、小(small)、正常(normal)、大(big)、最大(largest)
const imagesMaxWidth = Dimensions.get('window').width;
// 以后做标签样式对照表
const baseStyles = StyleSheet.create({
  b: boldStyle,
  strong: boldStyle,
  span: { fontWeight: 'normal' },
  p: {},
  h1: { fontWeight: 'bold', fontSize: 36 },
  h2: { fontWeight: 'bold', fontSize: 30 },
  h3: { fontWeight: 'bold', fontSize: 24 },
  h4: { fontWeight: 'bold', fontSize: 18 },
  h5: { fontWeight: 'bold', fontSize: 14 },
  h6: { fontWeight: 'bold', fontSize: 12 },
});

class HtmlView extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      element: null,
    };
  }

  componentDidMount() {
    this.mounted = true;
    let { html, fontSize } = this.props;
    this.startHtmlRender({
      html: html,
      size: fontSize,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.html !== nextProps.html ||
      this.props.stylesheet !== nextProps.stylesheet ||
      this.props.fontSize !== nextProps.fontSize
    ) {
      this.startHtmlRender({
        html: nextProps.html,
        style: nextProps.stylesheet,
        size: nextProps.fontSize,
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startHtmlRender = ({ html, style, size }) => {
    const {
      stylesheet,
      onError,
      imagesMaxWidth,
      popover,
      onImagePress,
      onLongPress,
      onMarkPress,
      debug,
    } = this.props;

    if (!html) {
      this.setState({ element: null });
    }

    const opts = {
      styles: { ...baseStyles, ...stylesheet, ...style },
      size: size,
      imgMaxW: imagesMaxWidth,
      popover,
      onImagePress,
      onLongPress,
      onMarkPress,
      debug,
    };

    htmlToElement(html, opts, (err, element) => {
      if (err) {
        onError(err);
      }

      if (this.mounted) {
        this.setState({ element });
      }
    });
  };

  render() {
    let { RootComponent, style } = this.props || {};
    let { element } = this.state;

    if (element) {
      return <RootComponent style={style}>{element}</RootComponent>;
    }
    return <RootComponent style={style} />;
  }
}

HtmlView.propTypes = {
  onError: PropTypes.func,
  RootComponent: PropTypes.func,
  style: ViewPropTypes.style,
  stylesheet: PropTypes.object,
  html: PropTypes.string,
  fontSize: PropTypes.string,
  imagesMaxWidth: PropTypes.number,
  popover: PropTypes.array,
  onImagePress: PropTypes.func,
  onLongPress: PropTypes.func,
  onMarkPress: PropTypes.func,
  debug: PropTypes.bool,
};

HtmlView.defaultProps = {
  onError: console.error.bind(console),
  RootComponent: element => <View {...element} />,
  fontSize: fontSize,
  imagesMaxWidth: imagesMaxWidth,
  popover: [],
  onImagePress: () => {},
  onLongPress: () => {},
  onMarkPress: () => {},
  debug: false,
};

export default HtmlView;
