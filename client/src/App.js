import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Routes>
            <Route exact path="/" component={Fib} />
            <Route exact path="/otherpage" component={OtherPage} />
          </Routes>
        </div>
        <Fib />
      </div>
    </Router>
  );
}

export default App;
