import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import EditEmployee from "./pages/EditEmployee";
import Homepage from "./pages/Homepage";
import NewEmployee from "./pages/NewEmployee";

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
      </Switch>
    </div>
  );
}

export default App;
