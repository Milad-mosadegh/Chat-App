import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from './components/landing/landing';

function App() {
  return (

    <Router>
      <Switch>
        <Route path="/" exact component={Landing}>
        </Route>

      </Switch>
    </Router>

  );
}

export default App;
