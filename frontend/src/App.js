// import logo from "./assets/logo.png";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Feed from "./components/feed";
import Profile from "./components/profile";
import OneMessage from "./components/oneMess";

function App() {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
    );
  } else
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/feed" component={Feed} />
          <Route path="/profile" component={Profile} />
          <Route path="/oneMess/:id" component={OneMessage} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;
