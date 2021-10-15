import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import Task from './components/Task';
import Schedule from './components/Schedule';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/reset'>
          <ResetPassword />
        </Route>
        <Route path='/new-password'>
          <NewPassword />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/homepage'>
          <HomePage />
        </Route>
        <Route path='/task'>
          <Task />
        </Route>
        <Route path='/schedule'>
          <Schedule />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
