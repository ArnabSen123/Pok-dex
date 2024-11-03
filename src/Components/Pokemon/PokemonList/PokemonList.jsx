import React, { Component, useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "bootstrap";
import "./PokemonList.css";
import { colours } from "../Utilities";
import { capitalizeFirstLetter } from "../Utilities";

const PokemonList = ({ pokemonType, clickSearchedPokemon }) => {
  const [pokemons, setPokemons] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [clickedPokemon, setCLickedPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [pokemonsType, setPokemonsType] = useState(pokemonType);
  const [typeOffSet, setTypeOffSet] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (pokemonType) {
      setPokemonsType(pokemonType);
      setCLickedPokemon(null);
    } else {
      setPokemonsType(null);
    }
  }, [pokemonType]);
  //console.log(pokemonType);
  //console.log(pokemonsType);

  useEffect(() => {
    if (clickSearchedPokemon) {
      setCLickedPokemon(clickSearchedPokemon);

      //console.log(clickSearchedPokemon);
    }
  }, [clickSearchedPokemon]);

  //console.log(clickedPokemon);

  const renderPokemonEvolutions = () => {
    if (!evolutionChain) return null;
    const evolutions = [];
    const getEvoluationChain = (chain) => {
      if (!chain || !chain.species || !chain.species.url) {
        return null; // If chain, species, or url is undefined, exit the function
      }

      const id = chain.species.url.split("/").slice(-2, -1)[0];

      evolutions.push(
        <div className="col">
          <div className="card" onClick={() => fetchPokemonDetails(id)}>
            <img
              key={chain.species.name}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt={chain.species.name}
              className="img-fluid rounded-start evoPokemon"
            />
            <div className="card-body">
              <h5 className="card-title">
                {capitalizeFirstLetter(chain.species.name)}
              </h5>
              {clickedPokemon.types.map((type, index) => (
                <span
                  className="abilities"
                  key={index}
                  style={{ backgroundColor: colours[type.type.name] }}
                >
                  {capitalizeFirstLetter(type.type.name)}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
      chain.evolves_to.forEach((evolution) => getEvoluationChain(evolution));
    };

    getEvoluationChain(evolutionChain.chain);
    //getEvoluationChain(evolutionChain.chain.evolves_to[0]);
    //getEvoluationChain(evolutionChain.chain.evolves_to[0].evolves_to[0]);
    ////console.log(evolutions);

    return (
      <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{ margin: "auto" }}
      >
        {evolutions}
      </div>
    );
  };

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
        //console.log(error);
      }
    };
    getPokemons();
  }, [offSet]);
  //console.log(pokemons);

  useEffect(() => {
    if (clickedPokemon) {
      const getClickedPokemon = async () => {
        try {
          const response1 = await axios.get(clickedPokemon.species.url);
          setPokemonSpecies(response1.data);
          const response2 = await axios.get(response1.data.evolution_chain.url);
          //console.log(response1.data.evolution_chain.url);
          setEvolutionChain(response2.data);
          //console.log(response2.data);
        } catch (error) {
          //console.log(error);
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

  const handleOnType = () => {
    setTypeOffSet((prev) => {
      return prev + limit;
    });
  };

  const onPokemonClick = (clickedPokemon) => {
    fetchPokemonDetails(clickedPokemon.name);
  };

  const fetchPokemonDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setCLickedPokemon(response.data);
    } catch (error) {
      //console.log(error);
    }
  };

  //console.log(offSet);
  //const pokemonFetch = "https://pokeapi.co/api/v2/pokemon/";
  ////console.log(pokemonFetch);
  //{pokemons && <PokemonCard data={pokemons}/>}
  return (
    <>
      {!clickedPokemon && !pokemonsType && (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {pokemons.map(
              (pokemon) =>
                pokemon && (
                  <PokemonCard
                    key={pokemon.name}
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
      {!clickedPokemon && pokemonsType && (
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {pokemonsType
              .slice(0, typeOffSet + limit)
              .map(
                (data) =>
                  data.pokemon && (
                    <PokemonCard
                      key={data.pokemon.name}
                      pokemon={data.pokemon}
                      onPokemonClick={onPokemonClick}
                    />
                  )
              )}
          </div>

          {typeOffSet + limit < pokemonsType.length && (
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleOnType}
              >
                Load More Pokemon
              </button>
            </div>
          )}
        </div>
      )}
      {clickedPokemon && (
        <div
          className="card mb-3"
          style={{
            maxwidth: "540px",
            width: "750px",
            height: "750px",
            position: "relative",
            margin: "20px auto",
          }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={
                  clickedPokemon.sprites.other["official-artwork"].front_default
                }
                className="img-fluid rounded-start pokemon"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <section className="pokemondesc">
                  <h4 className="card-title">
                    {capitalizeFirstLetter(clickedPokemon.name)}
                  </h4>
                  <p className="card-text description">
                    {pokemonSpecies &&
                      pokemonSpecies.flavor_text_entries
                        .find((entry) => entry.language.name === "en")
                        ?.flavor_text.replace(/\n/g, " ")}
                  </p>
                </section>

                <section className="details">
                  <h5 className="card-title"> Details</h5>
                  <span>
                    Category:{" "}
                    {pokemonSpecies &&
                      pokemonSpecies.genera.find(
                        (entry) => entry.language.name === "en"
                      ).genus}
                  </span>
                  <span>
                    Abilities: {capitalizeFirstLetter(clickedPokemon.abilities[0].ability.name)}
                  </span>
                  <span>Height: {clickedPokemon.height / 10} m</span>
                  <span>Weight: {clickedPokemon.weight / 10} kg</span>
                </section>

                <section>
                  {clickedPokemon.types.map((type, index) => (
                    <span
                      className="abilities"
                      key={index}
                      style={{ backgroundColor: colours[type.type.name] }}
                    >
                      {capitalizeFirstLetter(type.type.name)}
                    </span>
                  ))}
                </section>
              </div>
            </div>
          </div>
          <div className="evolution">
            <h5 style={{ marginLeft: "15px", marginBottom: "0px" }}>Evolutions</h5>
            {renderPokemonEvolutions()}
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setCLickedPokemon(null);
              }}
              style={{position: "relative"}}
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonList;
