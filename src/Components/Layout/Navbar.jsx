import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "../Pokemon/PokemonList/PokemonList";
import { colours } from "../Pokemon/Utilities";
import { capitalizeFirstLetter } from "../Pokemon/Utilities";

const Navbar = ({ onSearch, onType }) => {
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon";
  const typeURL = "https://pokeapi.co/api/v2/type/?limit=18";
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [pokemonType, setPokemonType] = useState(null);
  const [clickSearchedPokemon, setClickSearchedPokemon] = useState(null);

  useEffect(() => {
    const getTypes = async () => {
      try {
        const response = await axios.get(typeURL);
        setTypes(response.data.results);
      } catch (error) {
        //console.log(error);
      }
    };

    getTypes();
  }, []);

  //console.log(types);

  const getSearchedPokemon = async () => {
    if (!pokemonSearch.trim()) {
      alert("Please enter a Pokémon name or ID");
      return;
    }
    try {
      const response = await axios.get(`${pokemonURL}/${pokemonSearch}`);
      setPokemon(response.data);
      onSearch(pokemonSearch);
      setPokemonType(null);
      setClickSearchedPokemon(null);
    } catch (error) {
      //console.log(error);
      setPokemon(null);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getSearchedPokemon();
  };

  const handleOnClick = async (name) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${name}`
      );
      setPokemonType(response.data.pokemon);
      setPokemonSearch("");
      onType(name);
    } catch (error) {
      //console.log(error);
    }
  };

  const handleOnPokemonClick = () => {
    setClickSearchedPokemon(pokemon);
    setPokemon(null);
    setPokemonSearch("");
  };

  //console.log(clickSearchedPokemon);

  ////console.log(pokemonType);
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src="/src/assets/icons8-pokeball-48.png" alt="" href="" />
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
                <li className="typeName">
                        <a
                          className="dropdown-item"
                          style={{ backgroundColor: "#F2F2F2"}}
                          href="#"
                          onClick={() => {
                            onType(null);
                            setPokemonType(null);
                            onSearch(null);
                            setClickSearchedPokemon(null);
                            setPokemon(null);
                            setPokemonSearch("");
                          }}
                        >
                          All Pokemon
                        </a>
                      </li>
                  {types &&
                    types.map((type) => (
                      <li className="typeName">
                        <a
                          className="dropdown-item"
                          style={{ backgroundColor: colours[type.name] }}
                          href="#"
                          onClick={() => {
                            handleOnClick(type.name);
                          }}
                        >
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
                placeholder="Search Pokemon By Name or ID"
                aria-label="Search"
                value={pokemonSearch}
                onChange={(e) => {
                  setPokemonSearch(e.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit" onSubmit={handleOnSubmit}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {pokemon && !pokemonType && (
        <div>
          <div
            className="card"
            onClick={handleOnPokemonClick}
            style={{
              position: "relative",
              width: "350px",
              height: "350px",
              margin: "20px auto",
              backgroundColor: "#F2F2F2",
            }}
          >
            <h6>{pokemon.id}</h6>
            {pokemon.sprites?.front_default && (
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                className="card-img-top"
                alt="..."
              />
            )}
            <div className="card-body"style={{marginTop: "20px"}}>
              <h3 className="card-title" >
                {capitalizeFirstLetter(pokemon.name)}
              </h3>
              <p className="card-text">
                {pokemon.types.map((type, index) => (
                  <span
                    className="abilities"
                    key={index}
                    style={{
                      backgroundColor: colours[type.type.name],
                    }}
                  >
                    {capitalizeFirstLetter(type.type.name)}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                onSearch(null);
                setClickSearchedPokemon(null);
                setPokemonSearch("");
                setPokemon(null);
              }}
              style={{ width: "350px", margin: "auto" }}
            >
              Back to List
            </button>
          </div>
        </div>
      )}
      {(pokemonType || clickSearchedPokemon) && (
        <PokemonList
          pokemonType={pokemonType}
          clickSearchedPokemon={clickSearchedPokemon}
        />
      )}
    </>
  );
};

export default Navbar;
