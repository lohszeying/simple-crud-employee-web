import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
