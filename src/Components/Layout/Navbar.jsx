import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useState } from "react";
import axios from "axios";

const Navbar = () => {
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonSearch, SetPokemonSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);

  const getSearchedPokemon = async () => {
    try {
      const response = await axios.get(`${pokemonURL}/${pokemonSearch}`);
      setPokemon(response.data);
      SetPokemonSearch("");
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
                  SetPokemonSearch(e.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {pokemon && (
        <div className="container mt-5 pt-5">
          <div className="card">
            {pokemon.sprites?.front_default && (
              <img
                src={pokemon.sprites.front_default}
                className="card-img-top"
                alt={pokemon.name}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
