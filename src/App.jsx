// import { Button } from "antd-mobile";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Map from "./pages/Map";
function App() {
  return (
    <Router>
      <Switch>
        {/* <Link to="/home">首页</Link>
      <Link to="/citylist">城市选择</Link> */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/home/index" />}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
