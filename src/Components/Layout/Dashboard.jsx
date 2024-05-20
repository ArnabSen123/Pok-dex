import React, { Component } from 'react'
import PokemonList from '../Pokemon/PokemonList'

const Dashboard=()=>{
    return (
      <div className='row'>
        <div className="col">
            <PokemonList/>
        </div>
      </div>
    )
}

export default Dashboard;
