import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Schedule from "./pages/Schedule";
import Task from "./pages/Task";
import SetProfile from "./pages/SetProfile";
import Friend from "./pages/Friend";

function AuthRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem("user") ? localStorage.getItem("user") : false;

  return <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)} />;
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/new-password" component={NewPassword} />
        <Route path="/signup" component={SignUp} />
        <Route path="/setup-profile" component={SetProfile} />
        <Route exact path="/">
          <Navbar isLanding={true} />
          <LandingPage />
        </Route>
        <Route>
          <Navbar isLanding={false} />
          <Sidebar />
          <Switch>
            <AuthRoute path="/home" component={() => <Home />} />
            <AuthRoute path="/schedule" component={() => <Schedule />} />
            <AuthRoute path="/task" component={() => <Task />} />
            <AuthRoute path="/friends" component={() => <Friend />} />
          </Switch>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
