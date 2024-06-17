import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PokemonCard.css";
import { colours } from "../Utilities";
import { capitalizeFirstLetter } from "../Utilities";

const PokemonCard = ({ pokemon , onPokemonClick}) => {
  const pokemonName = pokemon.name;
  ////console.log(pokemonName);
  const pokemonURL = pokemon.url;
  ////console.log(pokemonURL);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [pokemonStat, setPokemonStat] = useState(false);

  
  
  const handleOnClick = ()=>{
    setPokemonStat(true);
    onPokemonClick(pokemonDetails);
    //console.log(pokemonStat);
  }

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemonURL);
        setPokemonDetails(response.data);
        //console.log(pokemonDetails);
      } catch (error) {
        //console.log(error);
      }
    };
    getPokemonDetails();
  }, [pokemonURL]);

  if (!pokemonDetails || !pokemonDetails.types) {
    return <div>Loading...</div>;
  }
  ////console.log(pokemonDetails);
  return (
    <>
      <div className="col" onClick={handleOnClick}>
        <div className="card card-pokemon">
          <h6>{pokemonDetails.id}</h6>
          {pokemonDetails.sprites?.front_default && (
            <img
              src={pokemonDetails.sprites.other["official-artwork"].front_default}
              className="card-img-top"
              alt="..."
            />
          )}
          <div className="card-body">
            <h3 className="card-title">
              {capitalizeFirstLetter(pokemonName)}
            </h3>
            <p className="card-text">
              {pokemonDetails.types.length > 0 && (<span className="abilities" style={{backgroundColor: colours[pokemonDetails.types[0].type.name]}}>
                {capitalizeFirstLetter(pokemonDetails.types[0].type.name)}
              </span>)}
              {pokemonDetails.types.length > 1 && (
                <span className="abilities" style={{backgroundColor: colours[pokemonDetails.types[1].type.name]}} >
                  {capitalizeFirstLetter(pokemonDetails.types[1].type.name)}
                  
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
