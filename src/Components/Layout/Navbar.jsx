import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useState } from "react";
import axios from "axios";

const Navbar = ({onSearch}) => {
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const getSearchedPokemon = async () => {
    try {
      const response = await axios.get(`${pokemonURL}/${pokemonSearch}`);
      setPokemon(response.data);
      onSearch(pokemonSearch);
    } catch (error) {
      console.log(error);
      setPokemon(null);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getSearchedPokemon();
  };

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
                  aria-expanded="false"
                >
                  Type
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
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
      {(pokemon && pokemonSearch) && (
        <div className="card">
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
            {pokemon.types.length > 0 && (<span className="abilities">
              {capitalizeFirstLetter(pokemon.types[0].type.name)}
            </span>)}
            {pokemon.types.length > 1 && (
              <span className="abilities">
                {capitalizeFirstLetter(pokemon.types[1].type.name)}  
              </span>
            )}
          </p>
        </div>
      </div>
      )}
    </>
  );
};

export default Navbar;
