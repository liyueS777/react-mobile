import React from 'react';
import Loadable from 'react-loadable';
import timing from '../../assets/images/timg.gif'
import '../../assets/css/common/loading.less'
const loading = function(){
    return (<div className="loading"><img src={timing} /></div>)
}


export default  Loadable({
    loader: () => import('.//404'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});