import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import EditEmployee from "./pages/EditEmployee";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NewEmployee from "./pages/NewEmployee";
import Register from "./pages/Register";

function App() {
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
