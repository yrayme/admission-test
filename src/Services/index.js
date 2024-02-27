import axios from "axios";
import { BASE_URL } from "../constants";

export const getAllPokemons =  async () => { 
  try {
    const { data } = await axios.get(`${BASE_URL}pokemon?limit=100000&offset=0`);
    return data.results;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getPokemonById =  async (url) => { 
  try {
    const { data } = await axios.get(url);
    const { name, id, height, weight, types, sprites } = data;
    return {
      name,
      id,
      height,
      types,
      sprites,
      weight
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export const getTypesPokemon =  async () => { 
  try {
    const { data } = await axios.get(`${BASE_URL}type/`);
    return data.results;
  } catch (error) {
    return Promise.reject(error);
  }
}