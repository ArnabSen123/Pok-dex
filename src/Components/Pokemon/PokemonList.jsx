import React, { Component, useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios';

const PokemonList = ()=>{
  const [pokemons, setPokemons] = useState([]);
  useEffect(()=>{
    const getPokemons = async () => {
      try{
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        setPokemons(response.data.results);
      }
      catch(error){
        console.log(error);
      }
    };
    getPokemons();
  }, []);
  console.log(pokemons);
  //const pokemonFetch = "https://pokeapi.co/api/v2/pokemon/";
  //console.log(pokemonFetch);
  //{pokemons && <PokemonCard data={pokemons}/>}
  return (
    <>
    {pokemons.map((pokemon) => (
      pokemon && <PokemonCard pokemon={pokemon}/>
    ))}
    </>
  )
}

export default PokemonList;
