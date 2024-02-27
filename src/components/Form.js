import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import Text from './Text';
import { useState } from 'react';
import { useEffect } from 'react';
import SelectComponent from './Select';
import StandardImageList from './ImageList';
import { getOrderImagesSprites } from '../utils/getSprites';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Form({ open, setOpen, pokemonTypesOptions, pokemons, setPokemons}) {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedTypeOld, setSelectedTypeOld] = useState([]);
  const [optionFriends, setOptionFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [oldData, setOldData] = useState(null);
  const [valueInputs, setValueInputs] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    if (open.data){
      setSelectedType(getTypes(open.data?.types));
      setSelectedFriends(open.data?.friends || []);
      setValueInputs({
        name: open.data?.name,
        description: open.data?.description,
      })
      setSelectedImage({
        id: "front",
        name: "front_default",
        image: open.data.sprites.front_default
      });
      setImages(getOrderImagesSprites(open.data.sprites));
    }
    if (open.old) {
      const pokemonsExists = localStorage.getItem("pokemons");
      if (pokemonsExists) {
        const pokemonsSave = JSON.parse(pokemonsExists);
        const oldDataPokemon = pokemonsSave.filter(poke => poke.id === open.data?.id)[0];
        setOldData({
          ...oldDataPokemon,
          types: getTypes(oldDataPokemon.types),
        });
        setSelectedTypeOld(getTypes(oldDataPokemon.types));
      }
    }
  }, [open])

  const getTypes = (types) => {
    const typesOrder = types.length > 0 && types.map((type) => {
      return  type.type
    })
    return typesOrder;
  }

  useEffect(() => {
    if (selectedType.length > 0) {
      const filteredPokemons = pokemons.filter(pokemon => 
        selectedType.every(type => 
          pokemon.types.some(pokemonType => 
            pokemonType.type.name === type.name && pokemon.id !== open.data?.id
          )
        )
      );
      if (filteredPokemons.length === 0 ) setSelectedFriends([]);
      setOptionFriends(filteredPokemons);
    }
  }, [selectedType, open, pokemons])
  
  
  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setValueInputs({
      ...valueInputs,
      [name]: value,
    })
  }
  
  const handleSubmit = () => {
    const pokemonsExists = localStorage.getItem("pokemons");  
    if (pokemonsExists){
      const pokemonsSave = JSON.parse(pokemonsExists);
      pokemonsSave.length > 0 && pokemonsSave.map((poke) => {
        return poke.id !== open.data?.id && localStorage.setItem("pokemons", JSON.stringify([...pokemonsSave, open.data]));
      })
    }else localStorage.setItem("pokemons", JSON.stringify([open.data]));
    const updateTypes = selectedType.map((type, index) => {
      return {
        slot: index + 1,
        type: type
      }
    })
    const bodyUpdatedPokemon = {
      "name": valueInputs.name,
      "id": open.data?.id,
      "height": open.data?.height,
      "types": updateTypes,
      "weight": open.data?.weight,
      "description": valueInputs.description,
      "friends": selectedFriends,
      "sprites":{
        ...open.data?.sprites,
        [selectedImage.name]: open.data?.sprites.front_default,
        front_default: selectedImage.image,
      }
    }
    
    const indexPokemon = pokemons.findIndex(pokemon => pokemon.id === open.data?.id);
    if (indexPokemon !== -1) {
      pokemons[indexPokemon] = bodyUpdatedPokemon;
      setPokemons(pokemons);
      setOpen({open: false, data: null });
    }
  }

  const handleDelete = () => {
    const indexToDelete = pokemons.findIndex(pokemon => pokemon.id === open.data?.id);
    if (indexToDelete !== -1) {
      pokemons.splice(indexToDelete, 1);
      setPokemons(pokemons);
      setOpen({open: false, data: null });
    }
  }

  return ( 
    <React.Fragment key={open}>
        <Drawer
            anchor={"right"}
            open={open.open}
        >
            <Box sx={{
              width: {xs: "300px", md: "600px"},
              m: 3
            }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <Typography sx={{fontWeight: 500, fontSize: 20}}>{(!open.old) ? "Editar Pokemon" : !oldData ? "Resumen Pokemon" : "Resumen de Pokemon (Datos originales vs Datos actualizados)"}</Typography>
                <IconButton onClick={() => setOpen({open: false, data:null })}>
                  <CloseIcon/>
                </IconButton>
              </Box>
              <hr/>
              <Box mt={5}>
                {open.old && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4}}>
                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={() => handleDelete()}>
                      Eliminar
                    </Button>
                  </Box>
                  )}
                {open.old && oldData && (
                  <Box>
                    <Box mb={4}>
                      <Typography>Datos originales</Typography>
                      <hr/>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Text 
                          label="Número de Pokedex" 
                          value={oldData?.id} 
                          disabled
                        />                      
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Text 
                          label="Nombre" 
                          value={oldData?.name} 
                          disabled
                        />                      
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Text 
                          label="Altura" 
                          value={oldData?.height} 
                          disabled
                        />                      
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Text 
                          label="Peso" 
                          value={oldData?.weight} 
                          disabled
                        />                      
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <SelectComponent
                          label={"Tipo"} 
                          options={pokemonTypesOptions}
                          setSelected={setSelectedTypeOld}
                          selected={selectedTypeOld}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={12} sx={{display: "flex", justifyContent: "center", mt: 2}}>
                        <Typography sx={{fontWeight: 600}}>Vista frontal</Typography>
                      </Grid>
                      <Grid item xs={12} md={12} sx={{display: "flex", justifyContent: "center", height: 150, width: 150,}}>
                        <img 
                          src={oldData?.sprites?.front_default}
                          alt="img" 
                          sx={{height: 200, width: 200}}
                        />
                      </Grid>
                      {!open.old && (
                        <Grid item xs={12} md={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                          <Button variant='contained' onClick={() => handleSubmit()}>
                            Guardar
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                    <Box my={4}>
                      <Typography>Datos actualizados</Typography>
                      <hr/>
                    </Box>
                  </Box>
                )}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Text 
                      name="name"
                      label="Nuevo nombre" 
                      value={valueInputs.name} 
                      onChange={onChangeInputs}
                    />                      
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <SelectComponent
                      label={"Nuevo tipo"} 
                      options={pokemonTypesOptions}
                      setSelected={setSelectedType}
                      selected={selectedType}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <SelectComponent
                      label={"Mejores amigos"} 
                      options={optionFriends}
                      setSelected={setSelectedFriends}
                      selected={selectedFriends}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Text 
                      name="description"
                      label="Descripción" 
                      value={valueInputs.description} 
                      multiline={true}
                      onChange={onChangeInputs}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <StandardImageList 
                      list={images}
                      selected={selectedImage}
                      setSelected={setSelectedImage}  
                    />
                  </Grid>
                  {!open.old && (
                    <Grid item xs={12} md={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                      <Button variant='contained' onClick={() => handleSubmit()}>
                        Guardar
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
        </Drawer>
    </React.Fragment>
  )
}

