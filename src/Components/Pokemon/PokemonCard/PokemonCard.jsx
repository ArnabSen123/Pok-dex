import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  const pokemonName = pokemon.name;
  console.log(pokemonName);
  const pokemonURL = pokemon.url;
  const [pokemonDetails, setPokemonDetails] = useState([]);

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

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="col">
        <div className="card">
          {pokemonDetails.sprites?.front_default && (
            <img
              src={pokemonDetails.sprites.front_default}
              class="card-img-top"
              alt="..."
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{pokemonName}</h5>
            <p className="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
