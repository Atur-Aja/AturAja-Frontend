import "./App.css";
import React, { useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function AuthRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem("user") ? localStorage.getItem("user") : false;

  return <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />)} />;
}

function App() {
  const [isNavOpen, setNavOpen] = useState(false);
  const [isShow, setShow] = useState(false);
  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };
  const toggleCreate = () => {
    setShow(!isShow);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/new-password" component={NewPassword} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/">
          <Navbar isLanding={true} />
          <LandingPage />
        </Route>
        <Route>
          <Navbar toggle={toggleNav} toggleCreate={toggleCreate} isLanding={false} />
          <Sidebar isOpen={isNavOpen} />
          <div className={"transition-all ease-in-out duration-200 " + (isNavOpen ? "lg:ml-60" : "lg:ml-14")}>
            <Switch>
              <AuthRoute path="/home" component={() => <Home show={isShow} onClose={() => setShow(false)} />} />
            </Switch>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
