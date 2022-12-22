import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import EditEmployee from "./pages/EditEmployee";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NewEmployee from "./pages/NewEmployee";
import Register from "./pages/Register";

import { RootState } from "./store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {toast} from 'react-toastify'
import { Status } from "./model/status";
import { useHistory } from "react-router-dom";

function App() {

  const getStatus = useSelector((state: RootState) => state.user.status);
  const getErrorMsg = useSelector((state: RootState) => state.user.errorMsg);
  const history = useHistory();

  useEffect(() => {
    if (getStatus === Status.REJECTED) {
      toast("Rejected: " + getErrorMsg);
    } else if (getStatus === Status.FULFILLED) {
      toast("Success!")
      history.push('/')
    }
  }, [getStatus])

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/create" >
          <NewEmployee />
        </Route>
        <Route path="/edit" >
          <EditEmployee />
        </Route>
        <Route path="/register" >
          <Register />
        </Route>
        <Route path="/login" >
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
