import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function StandardImageList({ list, selected, setSelected }) {

  const handleChange = (image) => {
    setSelected(image);
  }
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ImageList sx={{ width: "500", height: "auto", overflowY: "hidden" }} cols={2} rowHeight={164}>
        {list &&
          list.map((item, index) => (
            <ImageListItem key={index} sx={{cursor: "pointer", border: selected.image === item.image && "3px solid red", height: 164, width: 200}}>
              <img
                src={item.image}
                srcSet={item.image}
                alt={item.id}
                loading="lazy"
                onClick={() => handleChange(item)}
                sx={{height: 200, width: 200}}
              />
              <ImageListItemBar title={`Vista ${item.id === "front" ? "Frontal" : "trasera"}`}/>
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
}
