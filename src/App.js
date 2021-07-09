import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import  './firebase/initialyApp'
import Home from './pages/Home'
import SingUp from './pages/singUp'
import './App.css'
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/singUp'>
          <SingUp/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
