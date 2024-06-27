import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import Assessment from './components/Assessment'

import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/assessment" component={Assessment} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
