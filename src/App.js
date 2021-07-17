import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import  './firebase/initialyApp'
import Home from './pages/home'
import Register from './pages/register'
import SingIn from './pages/login'
import { SearchContext } from './context/useContextMessages'
import './App.css'
export default function App() {
  return (
    <BrowserRouter>
      <SearchContext>
        <Switch>
          <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/login'>
            <SingIn/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </SearchContext>  
    </BrowserRouter>
  )
}
