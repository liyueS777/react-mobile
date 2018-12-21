
import React from 'react';
import Loadable from 'react-loadable';
import timing from '../assets/images/timg.gif'
import '../assets/css/common/loading.less'
const loading = function(){
    return (<div className="loading"><img src={timing} /></div>)
}


const Home = Loadable({
    loader: () => import('../views/Home/Home'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});
const Login = Loadable({
    loader: () => import('../views/Login/Login'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});
const NotFind = Loadable({
    loader: () => import('../views/NotFind/404'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});
const CommentList = Loadable({
    loader: () => import('../views/Comment/List'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});
const CommentDetail = Loadable({
    loader: () => import('../views/CommentDetail/CommentDetail'),
    loading//这里的loading是一个函数返回一个jsx语法的前提是引入react，也可以使用一个loading 的component组件
});


const routes = [ 
    {
        path:'/',
        component:Home,
        exact:true,
        meta:{
            title:'首页'
        },
        routes:[
            {
                path:'/home/commentList',
                component:CommentList,
                meta:{
                    title:'评论列表'
                }
            },
            {
                path:'/home/commentDetail',
                component:CommentDetail,
                meta:{
                    title:'评论详情'
                }
            }
        ]
    },
    {
        path:'/login',
        component:Login,
        exact:true,
        meta:{
            title:'登录'
        }
    },
    {
        path:'/login111',
        component:Login,
        exact:true,
        meta:{
            title:'登录'
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
 export default routes