import React from "react";
import { useState } from "react";

const Search = ({ searchedPokemon }) => {
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon";
  const [pokemonSearch, SetPokemonSearch] = useState(searchedPokemon);
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

  if (pokemonSearch) {
    getSearchedPokemon();
  }
  
  return (
    <>
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

export default Search;
