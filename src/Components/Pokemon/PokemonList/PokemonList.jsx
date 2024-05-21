import React, { Component, useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import axios from "axios";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=20`
        );
        setPokemons((prevPokemons)=>[...prevPokemons, ...response.data.results]);
      } catch (error) {
        console.log(error);
      }
    };
    getPokemons();
  }, [offSet]);
  console.log(pokemons);

  const handleOnClick = () => {
    setOffSet((prev) => {
      return prev + 20;
    });
  };
  console.log(offSet);
  //const pokemonFetch = "https://pokeapi.co/api/v2/pokemon/";
  //console.log(pokemonFetch);
  //{pokemons && <PokemonCard data={pokemons}/>}
  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {pokemons.map(
            (pokemon) => pokemon && <PokemonCard pokemon={pokemon} />
          )}
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-primary" type="button" onClick={handleOnClick}>
            Load More Pokemon
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
