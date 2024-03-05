import React, { useState } from "react";
import EnhancedTable from "../components/Table";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { Box } from "@mui/material";

export default function Home(props) {
  const { tableRows, setLoading, pokemonTypesOptions } = props;
  const [openForm, setOpenForm] = useState({
    open: false,
    data: null,
    old: false,
  });

  useEffect(() => {
    localStorage.removeItem("pokemons");
  }, [])
  

  const handleEditButton = (row) => (e) => {
    e.stopPropagation();
    const {
      html_image,
      html_types,
      html_my_sprite,
      html_my_types,
      html_my_teammates,
      ...params
    } = row;
    setOpenForm({
      open: true,
      data: {...params},
      old: false,
    })
  };

  return (
    <Box px={{sm: 10, xs: 2}} py={4}>
      {tableRows.length > 0 ? (
        <EnhancedTable
          rowsProp={tableRows}
          handleEditButton={handleEditButton}
          setLoading={setLoading}
          setOpenForm={setOpenForm}
          openForm={openForm}
          pokemonTypesOptions={pokemonTypesOptions}
        />
      ) : (
        <Loading/>
      )}
    </Box>
  );
}
