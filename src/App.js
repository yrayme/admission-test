import Routes from "./Routes";
import "./App.css";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Error from "./components/Error";
import { getAllPokemons, getPokemonById, getTypesPokemon } from "./Services";
import Loading from "./components/Loading";

function App() {
  const [tableRows, setTableRows] = React.useState([]);
  const [dataPokemons, setDataPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pokemonTypesOptions, setPokemonTypesOptions] = useState([]);

  const getPokemons =  async () => { 
    try {
      const data = await getAllPokemons();
      setDataPokemons(data);
    } catch (error) {
      setError(error);
    }
  }

  const getAllTypesPokemon =  async () => { 
    try {
      const data = await getTypesPokemon();
      setPokemonTypesOptions(data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    getAllTypesPokemon();
    getPokemons();
  }, [])

  useEffect(() => {
    dataPokemons.length > 0 && dataPokemons.map((poke) => {
      return addDataPokemon(poke);
    })
  }, [dataPokemons])

  const addDataPokemon = async(poke) => {
    try {
      const data = await getPokemonById(poke.url);
      setTableRows(prevState => [...prevState, data]);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="App" style={{background: "#f5f5f5", height: "100vh"}}>
      {loading && <Loading/>}
      {error && <Error msg={error.response.data}/>}
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        setLoading={setLoading}
      />
      <Outlet />
    </div>
  );
}

export default App;
