import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Home from './Components/Home'

import Course from './Components/Courses'

import NotFound from './Components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={Course} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
