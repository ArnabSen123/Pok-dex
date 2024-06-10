import Navbar from "./Components/Layout/Navbar";
import Dashboard from "./Components/Layout/Dashboard";

import "./App.css";
import PokemonList from "./Components/Pokemon/PokemonList/PokemonList";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(null);
  
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  const handleType = (type) =>{
    setType(type);
  }

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} onType={handleType}/>
      {!search && !type && <PokemonList />}
    </div>
  );
}

export default App;
