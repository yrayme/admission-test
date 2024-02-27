import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { getPokemonById } from '../Services';
import { BASE_URL } from '../constants';
import Error from './Error';

export const Search = ({ setRows, setLoading, data }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(null);
    
    const getPokemonByName = async(value) => {   
        try {
            setLoading(true);
            const result = await getPokemonById(`${BASE_URL}pokemon/${value}`);
            setLoading(false);
            setRows(value !== "" ? [result] : data);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return (
        <Box sx={{display: "flex", justifyContent: "center", width: "100%", height: 40, py: 5, gap: 2}}>
            {error && <Error msg={error.response.data}/>}
            <TextField 
                id="outlined-basic"
                label="Buscar Pokemon" 
                variant="outlined" 
                size="small"
                sx={{
                    width: "80%"
                }}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
            /> 
            <Button variant="contained" color="primary" onClick={() => getPokemonByName(value)}>Buscar</Button>
        </Box>
    )
}
