import Navbar from "./Components/Layout/Navbar";
import Dashboard from "./Components/Layout/Dashboard";

import "./App.css";
import PokemonList from "./Components/Pokemon/PokemonList/PokemonList";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState(null);
  
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };
  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      {!search && <PokemonList />}
    </div>
  );
}

export default App;
