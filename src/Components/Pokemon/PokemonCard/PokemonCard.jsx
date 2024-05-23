import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PokemonCard.css";
import PokemonStats from "../PokemonStats/PokemonStats";

const PokemonCard = ({ pokemon }) => {
  const pokemonName = pokemon.name;
  //console.log(pokemonName);
  const pokemonURL = pokemon.url;
  const [pokemonDetails, setPokemonDetails] = useState([]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const handleOnClick = ()=>{
    {pokemonDetails && <PokemonStats pokemonStat={pokemonDetails}/>}
  }

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemonURL);
        setPokemonDetails(response.data);
        console.log(pokemonDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getPokemonDetails();
  }, [pokemonURL]);

  if (!pokemonDetails || !pokemonDetails.types) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="col">
        <div className="card" onClick={handleOnClick}>
          <h6>{pokemonDetails.id}</h6>
          {pokemonDetails.sprites?.front_default && (
            <img
              src={pokemonDetails.sprites.front_default}
              className="card-img-top"
              alt="..."
            />
          )}
          <div className="card-body">
            <h3 className="card-title">
              {capitalizeFirstLetter(pokemon.name)}
            </h3>
            <p className="card-text">
              {pokemonDetails.types.length > 0 && (<span className="abilities">
                {pokemonDetails.types[0].type.name}
              </span>)}
              {pokemonDetails.types.length > 1 && (
                <span className="abilities">
                  {pokemonDetails.types[1].type.name}
                  
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
