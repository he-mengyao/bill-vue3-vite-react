// 配置两种路由 一种是不需要权限的 一种是需要权限的
import About from '../views/about/about'
import Account from '../views/account/account'
import Data from '../views/data/data'
import Detail from '../views/detail/detail'
import Home from '../views/home/home'
import Login from '../views/login/login'
import User from '../views/user/user'
import Userinfo from '../views/userinfo/userinfo'



export interface Meta {
  title: string,
  icon?: string
}

export interface RouterItem {
  path: string,
  component: any,
  // 精准匹配 只有路径完全相同的时候才匹配
  exact: boolean,
  meta?: Meta
}


export const commonRoutes: RouterItem[] = [
  {
    path: '/login',
    component: Login,
    exact: true,
    meta: {
      title: '登录'
    }
  },
]

export const routes: RouterItem[] = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/about',
    component: About,
    exact: true,
  },
  {
    path: '/account',
    component: Account,
    exact: true,
  },
  {
    path: '/data',
    component: Data,
    exact: true,
  },
  {
    path: '/user',
    component: User,
    exact: true,
  },
  {
    path: '/userinfo',
    component: Userinfo,
    exact: true,
  },
  {
    path: '/detail',
    component: Detail,
    exact: true,
  },
]



