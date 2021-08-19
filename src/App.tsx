import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { commonRoutes, routes, RouterItem } from './router'

const App = () => {
  return (
    <Router>
      <Switch>
        {
          commonRoutes.map((item: RouterItem, index: number) => {
            return (
              <Route key={index} path={item.path} exact={item.exact} render={() => {
                // 路由守卫的代码
                document.title = item.meta!.title
                return (
                  <item.component />
                )
              }} />
            )
          })
        }
        {
          routes.map((item: RouterItem, index: number) => {
            return (
              <Route key={index} path={item.path} exact={item.exact} render={() => {
                // 路由守卫的代码
                document.title = '掘掘手札'
                let token = localStorage.getItem('token')
                if (!token) {
                  return (
                    <Redirect to='/login' />
                  )
                }
                return (
                  <item.component />
                )
              }} />
            )
          })
        }
      </Switch>
    </Router>
  )
}

export default App
