import Navbar from "./Components/Layout/Navbar";
import Dashboard from "./Components/Layout/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Dashboard />
      </div>
    </div>
  
  )
}

export default App;
