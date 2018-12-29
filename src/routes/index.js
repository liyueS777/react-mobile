
import React from 'react';
import Loadable from 'react-loadable';
import timing from '../assets/images/timg.gif'
import '../assets/css/common/loading.less'
const loading = function(){
    return (<div className="loading"><img src={timing} alt="正在加载中..." /></div>)
}


const Home = Loadable({
    loader: () => import('../views/Home/Home'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});
const Login = Loadable({
    loader: () => import('../views/Login/Login'),
    loading
});
const NotFind = Loadable({
    loader: () => import('../views/NotFind/404'),
    loading
});
const CommentList = Loadable({
    loader: () => import('../views/Comment/List'),
    loading
});
const CommentDetail = Loadable({
    loader: () => import('../views/CommentDetail/CommentDetail'),
    loading
});
const Index = Loadable({
    loader: () => import('../views/Home/Index'),
    loading
});
const HOC = Loadable({
    loader: () => import('../views/HOC/create2'),
    loading
});

export const baseRootRoute = '/app/'
export const routes = [
    {
        path:'/',
        component:Index,
        exact:true,//这里 如果有嵌套路由，那么不要严格匹配，不然子路由衍射不到，如果只有一级路由，那么需要严格匹配
        meta:{
            title:'首页',
            needLogin:false
        },
    },
    {
        path:'/home',
        component:Home,
        exact:false,//这里 如果有嵌套路由，那么不要严格匹配，不然子路由衍射不到，如果只有一级路由，那么需要严格匹配
        meta:{
            title:'首页home',
            needLogin:true,
            multiView:true//当是嵌套路由时登录状态以及权限管理放到嵌套的地方
        },
        routes:[
            {
                path:'/home/list',
                component:CommentList,
                exact:true,
                meta:{
                    title:'评论列表',
                    needLogin:true
                }
            },
            {
                path:'/home/commentDetail',
                exact:true,
                component:CommentDetail,
                meta:{
                    title:'评论详情',
                    needLogin:true
                }
            },
            {
                path:'/home/HOC',
                exact:true,
                component:HOC,
                meta:{
                    title:'HOC高阶组件',
                    needLogin:false
                }
            }
        ]
    },
    {
        path:'/login',
        component:Login,
        exact:true,
        meta:{
            title:'登录',
            needLogin:true,
            redirect:'/'
        }
    },
    {
        path:'/404',
        component:NotFind,
        meta:{
            title:'页面找不到'
        }
    }
]