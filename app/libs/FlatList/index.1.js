/**
 * 上拉下拉
 */
import * as React from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PaginationStatus = {
  FIRST_LOAD: 0, // 第一次加载
  WAITING: 1, // 等待加载
  IN_LOADED: 2, // 加载中
  ALL_LOADED: 3, // 加载完成
  NO_DATA: 5, // 一个数据都没有
};

class FlatListView extends React.Component {
  constructor(props) {
    super(props);
    this.rows = [];
    this.state = {
      dataSource: [],
      isRefreshing: false,
      paginationStatus: PaginationStatus.FIRST_LOAD,
    };
    // console.log('constructor TableList');
  }

  componentDidMount() {
    this.mounted = true;
    // console.log('componentDidMount TableList');
  }

  componentWillUnmount() {
    this.mounted = false;
    // console.log('componentWillUnmount TableList');
  }

  onRefresh = () => {
    let { setRefreshing, setRefresh } = this.props;
    // console.log('onRefresh TableList');
    if (this.mounted) {
      this.setState(
        {
          isRefreshing: true,
        },
        () => setRefresh(this.postRefresh, this.endFetch),
      );
      setRefreshing && setRefreshing(true);
    }
  };
  /** 上拉加载方法 */
  onPaginate = () => {
    // console.log('onPaginate TableList');
    if (
      this.state.paginationStatus !== PaginationStatus.ALL_LOADED &&
      !this.state.isRefreshing
    ) {
      // console.log('onPaginate()');
      this.setState({ paginationStatus: PaginationStatus.IN_LOADED });
      this.props.setEndReached(this.postPaginate, this.endFetch);
    }
  };
  /** 执行上拉加载动作 */
  onEndReached = () => {
    // console.log('onEndReached TableList');
    if (
      this.props.pagination &&
      this.state.paginationStatus === PaginationStatus.WAITING
    ) {
      // console.log('onEndReached()');
      this.onPaginate();
    }
  };

  postRefresh = (rows = []) => {
    // console.log('postRefresh TableList: ', rows);
    if (this.mounted) {
      let paginationStatus = PaginationStatus.WAITING;
      let mergedRows = [];
      if (this.props.noRefreshLoading) {
        mergedRows = rows;
      } else {
        mergedRows = rows.concat(this.getRows());
      }
      if (mergedRows.length <= 0) {
        paginationStatus = PaginationStatus.NO_DATA;
      }
      this.updateRows(mergedRows, paginationStatus);
    }
  };

  postPaginate = (rows = []) => {
    // console.log('postPaginate TableList: ', rows);
    let mergedRows = [];
    let paginationStatus;
    if (rows.length === 0) {
      paginationStatus = PaginationStatus.ALL_LOADED;
    } else {
      mergedRows = this.getRows().concat(rows);
      paginationStatus = PaginationStatus.WAITING;
    }

    this.updateRows(mergedRows, paginationStatus);
  };

  updateRows = (rows, paginationStatus) => {
    let { setRefreshing } = this.props;
    // console.log('updateRows TableList', rows, paginationStatus);
    if (rows.length) {
      // console.log('updateRows A');
      this.setRows(rows);
      this.setState(
        {
          dataSource: rows,
          isRefreshing: false,
          paginationStatus,
        },
        () => setRefreshing && setRefreshing(false),
      );
    } else {
      this.setState(
        {
          dataSource: this.getRows().slice(),
          isRefreshing: false,
          paginationStatus,
        },
        () => setRefreshing && setRefreshing(false),
      );
    }
  };

  setRows = rows => (this.rows = rows);

  getRows = () => this.rows;

  refresh = () => {
    // console.log('refresh TableList');
    this.onRefresh();
  };

  scrollToEnd = params => {
    // console.log('scrollToEnd TableList: ', params);
    if (this._flatList) {
      this._flatList.scrollToEnd(params);
    }
  };

  scrollToIndex = params => {
    // console.log('scrollToIndex TableList: ', params);
    if (this._flatList) {
      this._flatList.scrollToIndex(params);
    }
  };

  scrollToItem = params => {
    // console.log('scrollToItem TableList: ', params);
    if (this._flatList) {
      this._flatList.scrollToItem(params);
    }
  };

  scrollToOffset = params => {
    // console.log('scrollToOffset TableList: ', params);
    if (this._flatList) {
      this._flatList.scrollToOffset(params);
    }
  };
  /** 上拉加载结束 */
  endFetch = () => {
    // console.log('endFetch()');
    if (this.mounted) {
      this.setState({ isRefreshing: false });
    }
  };
  /** 手动更新数据 */
  updateDataSource = (rows = []) => {
    // console.log('updateDataSource()');
    this.setRows(rows);
    this.setState({
      dataSource: rows,
    });
  };
  /** 第一次数据加载 */
  firstAddDataSource = (rows = []) => {
    // console.log('firstAddDataSource()');
    let paginationStatus = PaginationStatus.WAITING;
    if (rows.length === 0) {
      paginationStatus = PaginationStatus.NO_DATA;
    }
    this.setRows(rows);
    this.setState({
      dataSource: rows,
      paginationStatus,
    });
  };
  /** 上拉加载中 */
  PaginationFetchingView = () => {
    // console.log('PaginationFetchingView()');
    if (this.props.PaginationFetchingView) {
      return this.props.PaginationFetchingView();
    }

    return (
      <View style={[styles.fetchingView]}>
        <Text style={styles.paginationViewText}>
          {this.props.waitingSpinnerText}
        </Text>
      </View>
    );
  };
  /** 上拉等待加载 */
  PaginationBtnView = () => {
    // console.log('PaginationBtnView()');
    if (this.props.pagination) {
      if (this.props.PaginationBtnView) {
        return this.props.PaginationBtnView();
      }

      return (
        <View style={[styles.fetchingView]}>
          <Text style={styles.paginationViewText}>
            {this.props.paginationBtnText}
          </Text>
        </View>
      );
    }
    return null;
  };
  /** 上拉加载完成，没有更多数据 */
  PaginationAllLoadedView = () => {
    // console.log('PaginationAllLoadedView()');
    if (this.props.pagination) {
      if (this.props.PaginationAllLoadedView) {
        return this.props.PaginationAllLoadedView();
      }
      return (
        <View style={[styles.paginationView]}>
          <Text style={styles.allLoadedText}>{this.props.allLoadedText}</Text>
        </View>
      );
    }
    return null;
  };
  /** 上拉加载中 */
  PaginationWaitingView = paginateCallback => {
    // console.log('PaginationWaitingView()');
    if (this.props.pagination) {
      if (this.props.PaginationWaitingView) {
        return this.props.PaginationWaitingView(paginateCallback);
      }

      return (
        <View style={[styles.paginationView]}>
          <ActivityIndicator
            color={this.props.spinnerColor}
            size={this.props.waitingSpinnerSize}
          />
          <Text style={[styles.paginationViewText, { marginLeft: 5 }]}>
            {this.props.waitingSpinnerText}
          </Text>
        </View>
      );
    }

    return null;
  };
  /** 第一次加载空数据 */
  EmptyView = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ lineHeight: 80 }}>抱歉没有数据</Text>
      </View>
    );
  };
  /** 底部视图 */
  renderFooter = () => {
    let { paginationStatus } = this.state;
    // console.log('renderFooter() this.getRows', this.getRows().length);
    if (paginationStatus === PaginationStatus.WAITING) {
      /** 等待上拉加载 */
      console.log('等待上拉加载');
      return this.PaginationBtnView();
    } else if (paginationStatus === PaginationStatus.IN_LOADED) {
      if (this.props.initialNumToRender && this.props.initialNumToRender > 0) {
        console.log('上拉加载中1');
        if (this.getRows().length < this.props.initialNumToRender) {
          console.log('上拉加载中2');
          return this.PaginationAllLoadedView();
        }
      }

      console.log('上拉加载中');
      /** 上拉加载中 */
      return this.PaginationWaitingView();
    } else if (
      /** 上拉加载完成 / 没有更多数据 */
      this.getRows().length !== 0 &&
      paginationStatus === PaginationStatus.ALL_LOADED
    ) {
      console.log('上拉加载完成 / 没有更多数据');
      return this.PaginationAllLoadedView();
    }
    return null;
  };
  /** 下拉组件 */
  renderRefreshControl = () => {
    // console.log('renderRefreshControl()');
    if (this.props.refreshable) {
      return (
        <RefreshControl
          onRefresh={this.onRefresh}
          refreshing={this.state.isRefreshing}
          colors={this.props.refreshableColors}
          progressBackgroundColor={
            this.props.refreshableProgressBackgroundColor
          }
          size={this.props.refreshableSize}
          tintColor={this.props.refreshableTintColor}
          title={this.props.refreshableTitle}
        />
      );
    }
    return null;
  };
  /** 自定义分割线 */
  renderItemSeparatorComponent = ({ highlighted }) => (
    <View
      style={{
        backgroundColor: '#E7E7E7',
        height: StyleSheet.hairlineWidth,
        marginHorizontal: 10,
      }}
    />
  );

  render() {
    const { numColumns, keyIdx, emptyView, ListEmptyComponent } = this.props;
    let { paginationStatus, dataSource } = this.state;
    let __emptyView__ = this.renderFooter;
    let __ListEmptyComponent__ = ListEmptyComponent;
    if (paginationStatus === PaginationStatus.NO_DATA) {
      if (ListEmptyComponent) {
        __ListEmptyComponent__ = () => {
          return <View style={{ height: 50 }} />;
        };
      }
      if (emptyView) {
        __emptyView__ = emptyView;
      } else {
        __emptyView__ = this.EmptyView;
      }
    }
    return (
      <FlatList
        key={keyIdx}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
        {...this.props}
        ref={ref => (this._flatList = ref)}
        data={dataSource}
        ListFooterComponent={__emptyView__}
        ListEmptyComponent={__ListEmptyComponent__}
        onEndReached={this.onEndReached}
        refreshControl={this.renderRefreshControl()}
        numColumns={numColumns}
      />
    );
  }
}

FlatListView.defaultProps = {
  initialNumToRender: 10,
  horizontal: false,
  keyExtractor: null,

  renderItem: null,

  firstLoader: true,
  scrollEnabled: true,
  onFetch: null,
  setRefresh: null,
  setEndReached: null,

  // Custom View
  paginationFetchingView: null,
  paginationAllLoadedView: null,
  paginationWaitingView: null,
  emptyView: null,

  // Refreshable
  refreshable: true,

  // RefreshControl
  refreshableTitle: null,
  refreshableColors: ['dimgray', 'tomato', 'limegreen'],
  refreshableProgressBackgroundColor: 'white',
  refreshableSize: undefined,
  refreshableTintColor: 'lightgray',
  customRefreshControl: null,

  // Pagination
  pagination: true,
  autoPagination: true,
  allLoadedText: 'End of List',

  // Spinner
  spinnerColor: undefined,
  fetchingSpinnerSize: 'large',
  waitingSpinnerSize: 'small',
  waitingSpinnerText: 'Loading...',

  // Pagination Button
  paginationBtnText: 'Load more...',

  // GridView
  numColumns: 1,
  keyIdx: '1',

  noRefreshLoading: false,
};

FlatListView.propTypes = {
  initialNumToRender: PropTypes.number,
  horizontal: PropTypes.bool,
  keyExtractor: PropTypes.func,

  renderItem: PropTypes.func,

  firstLoader: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  onFetch: PropTypes.func,
  setRefresh: PropTypes.func,
  setEndReached: PropTypes.func,

  // Custom ListView
  paginationFetchingView: PropTypes.func,
  paginationAllLoadedView: PropTypes.func,
  paginationWaitingView: PropTypes.func,
  emptyView: PropTypes.func,

  // Refreshable
  refreshable: PropTypes.bool,

  refreshableTitle: PropTypes.string,
  // refreshableColors: [],
  refreshableProgressBackgroundColor: PropTypes.string,
  refreshableSize: PropTypes.string,
  refreshableTintColor: PropTypes.string,
  customRefreshControl: PropTypes.func,

  // Pagination
  pagination: PropTypes.bool,
  autoPagination: PropTypes.bool,
  allLoadedText: PropTypes.string,

  // Spinner
  spinnerColor: PropTypes.string,
  fetchingSpinnerSize: PropTypes.string,
  waitingSpinnerSize: PropTypes.string,
  waitingSpinnerText: PropTypes.string,

  // Pagination Button
  paginationBtnText: PropTypes.string,

  // GridView
  numColumns: PropTypes.number,

  keyIdx: PropTypes.string,

  noRefreshLoading: PropTypes.bool,
};

const styles = StyleSheet.create({
  fetchingView: {
    width,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationView: {
    flex: 0,
    width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationViewText: {
    fontSize: 16,
  },
  paginationViewSpinner: {
    marginRight: 5,
  },
  paginationBtn: {
    backgroundColor: 'tomato',
    margin: 10,
    borderRadius: 20,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationBtnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 0.5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'lightgray',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allLoadedText: {
    alignSelf: 'center',
    color: '#bfbfbf',
  },
  gridItem: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});

export default FlatListView;
