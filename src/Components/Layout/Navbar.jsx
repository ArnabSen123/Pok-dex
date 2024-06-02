import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "../Pokemon/PokemonList/PokemonList";

const Navbar = ({ onSearch, onType}) => {
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon";
  const typeURL = "https://pokeapi.co/api/v2/type/?limit=18";
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [pokemonType, setPokemonType] = useState(null);
  const [clickSearchedPokemon, setClickSearchedPokemon] = useState(null);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const getTypes = async () => {
      try {
        const response = await axios.get(typeURL);
        setTypes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getTypes();
  }, []);

  console.log(types);
  const getSearchedPokemon = async () => {
    try {
      const response = await axios.get(`${pokemonURL}/${pokemonSearch}`);
      setPokemon(response.data);
      onSearch(pokemonSearch);
      setPokemonType(null);
      setClickSearchedPokemon(null);
    } catch (error) {
      console.log(error);
      setPokemon(null);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getSearchedPokemon();
  };

  const handleOnClick = async (name)=>{
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${name}`);
      setPokemonType(response.data.pokemon);
      setPokemonSearch("");
      onType(name);

    } catch (error) {
      console.log(error);
    }
  }

  const handleOnPokemonClick = ()=>{
    setClickSearchedPokemon(pokemon);
    setPokemon(null);
  }

  console.log(clickSearchedPokemon);

  //console.log(pokemonType);
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Pokédex
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                >
                  Type
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {types &&
                    types.map((type) => (
                      <li>
                        <a className="dropdown-item" href="#" onClick={()=>{handleOnClick(type.name)}}>
                          {capitalizeFirstLetter(type.name)}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleOnSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={pokemonSearch}
                onChange={(e) => {
                  setPokemonSearch(e.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {pokemon && pokemonSearch && !pokemonType && (
        <div className="card" onClick={handleOnPokemonClick}>
          <h6>{pokemon.id}</h6>
          {pokemon.sprites?.front_default && (
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              className="card-img-top"
              alt="..."
            />
          )}
          <div className="card-body">
            <h3 className="card-title">
              {capitalizeFirstLetter(pokemon.name)}
            </h3>
            <p className="card-text">
              {pokemon.types.length > 0 && (
                <span className="abilities">
                  {capitalizeFirstLetter(pokemon.types[0].type.name)}
                </span>
              )}
              {pokemon.types.length > 1 && (
                <span className="abilities">
                  {capitalizeFirstLetter(pokemon.types[1].type.name)}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
      {(pokemonType || clickSearchedPokemon) && <PokemonList pokemonType={pokemonType} clickSearchedPokemon={clickSearchedPokemon}/>}
    </>
  );
};

export default Navbar;
