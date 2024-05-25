import React, { Component, useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [clickedPokemon, setCLickedPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=20`
        );
        setPokemons((prevPokemons) => [
          ...prevPokemons,
          ...response.data.results,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    getPokemons();
  }, [offSet]);
  console.log(pokemons);

  useEffect(() => {
    if (clickedPokemon) {
      const getClickedPokemon = async () => {
        try {
          const response = await axios.get(clickedPokemon.species.url);
          setPokemonSpecies(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getClickedPokemon();
    }
  }, [clickedPokemon]);

  const handleOnClick = () => {
    setOffSet((prev) => {
      return prev + 20;
    });
  };

  const onPokemonClick = (clickedPokemon) => {
    setCLickedPokemon(clickedPokemon);
  };

  console.log(offSet);
  //const pokemonFetch = "https://pokeapi.co/api/v2/pokemon/";
  //console.log(pokemonFetch);
  //{pokemons && <PokemonCard data={pokemons}/>}
  return (
    <>
      {!clickedPokemon && (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {pokemons.map(
              (pokemon) =>
                pokemon && (
                  <PokemonCard
                    pokemon={pokemon}
                    onPokemonClick={onPokemonClick}
                  />
                )
            )}
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleOnClick}
            >
              Load More Pokemon
            </button>
          </div>
        </div>
      )}
      {clickedPokemon && (
        <div className="card mb-3" style={{ maxwidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={
                  clickedPokemon.sprites.other["official-artwork"].front_default
                }
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{clickedPokemon.name}</h5>
                <p className="card-text">
                  {pokemonSpecies &&
                    pokemonSpecies.flavor_text_entries.find(
                      (entry) => entry.version.name === "red"
                    ).flavor_text}
                </p>
                <p className="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonList;
