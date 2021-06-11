import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Welcome from './components/Welcome/Welcome';
import Home from './components/Home/Home';
import store from './redux/reducer/store';
import { Provider } from 'react-redux';
import {createBrowserHistory} from 'history';
import Hastag from './components/Hastags/Hastag';
import Notification from './components/Notification/Notification';
import Message from './components/Message/Message';
import UserProfile from './components/UserProfile/UserProfile';
import People from './components/People/People';

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history = {history}>
          <Switch>
            <Route exact path='/' component={Welcome}></Route>
            <Route exact path='/home' component={Home}></Route>
            <Route path='/userprofile' component={UserProfile}></Route>
            <Route path='/people' component={People}></Route>
            <Route path='/hastag' component={Hastag}></Route>
            <Route path='/notify' component={Notification}></Route>
            <Route path='/message' component={Message}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
