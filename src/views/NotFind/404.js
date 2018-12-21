import React from 'react';
import ReactDOM from 'react-dom';

import { getCompany } from '../../config/api'
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { PullToRefresh, ListView } from 'antd-mobile';

class NotFind extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      rData:[]
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  componentWillMount(){
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    // this.props.onEnter()()
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    getCompany()
    .then(res=>{
        console.log(res)
        var sData = [...this.state.rData,...res.data.slice(0,10)];
        this.setState({
            rData:sData,
            dataSource: this.state.dataSource.cloneWithRows(sData),
            height: hei,
            refreshing: false,
            isLoading: false,
        });
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    getCompany()
    .then(res=>{
        console.log(res)
        var sData = res.data.slice(0,10);
        this.setState({
            rData:sData,
            dataSource: this.state.dataSource.cloneWithRows(sData),
            refreshing: false,
            isLoading: false,
          });
    });
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    getCompany()
    .then(res=>{
        if(this.state.rData.length>50){
            this.setState({
                isLoading: false,
            });
            console.log(1111)
        }else {
            var sData = [...this.state.rData,...res.data.slice(0,10)];
            console.log(22222)

            this.setState({
                rData:sData,
                dataSource: this.state.dataSource.cloneWithRows(sData),
                isLoading: false,
            });
        }
        
    });

  };

  render() {
    const separator = (sectionID, rowID) => (
        <div
        key={`${sectionID}-${rowID}`}
        style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
        }}
        />
    );
    let index = this.state.rData.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.rData.length - 1;
      }
      const obj = this.state.rData[index--];
      return (
        <div key={rowID}
          style={{
            padding: '0 15px',
            backgroundColor: 'white',
          }}
        >
          <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
            {obj.compName}
          </div>
        </div>
      );
    };
    return (<div>
      {/* <Button
        style={{ margin: '30px 15px' }}
        inline
        onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
      >
        {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
      </Button> */}
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>Pull to refresh</span>}
        renderFooter={() => (<div style={{ padding: 15, textAlign: 'center' }}>
          {this.state.isLoading ? '正在加载中...' : '我也是有底线的~~'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={10}
      />
    </div>);
  }
}



export default NotFind;