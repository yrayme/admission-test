import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Slide, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { getOrderImagesSprites, getOrderImagesSpritesOthers, handleNext, handlePrevious } from "../utils/getSprites";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSprites = (props) => {
  const { open, setOpen } = props;
  const [images, setImages] = useState([]);
  const [countInitial, setCountInitial] = useState(0);
  const [countFinish, setCountFinish] = useState(1);
  const [countInitialOther, setCountInitialOther] = useState(0);
  const [countFinishOther, setCountFinishOther] = useState(1);
  const [otherImages, setOtherImages] = useState([]);

  const handleClose = () => {
    setOpen({
      open: false,
      photos: null
    });
  };
  
  useEffect(() => {
    if (open.data){
      setImages(getOrderImagesSprites(open.data.sprites));
      setOtherImages(getOrderImagesSpritesOthers(open.data.sprites.other));   
    }
  }, [open])

  return (
    <Dialog
      open={open.open}
      fullWidth={true}
      maxWidth={"sm"}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
      {`Más photos de ${open.data?.name}`}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <IconButton onClick={() => handlePrevious(setCountInitial, setCountFinish, countFinish, countInitial)} sx={{height: 40, width: 40, display: "flex", justifyContent: "center", alignItems: "center"}} disabled={countInitial === 0}>
            <ArrowBackIos sx={{height: 20}}/>
          </IconButton>     
          <Box>
            {images.length > 0 && images.slice(countInitial, countFinish).map((img, index) => {
              return (
                <Box key={index} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <img src={img.image} alt="img" height={200} width={200}/>
                  <Box>
                    <Typography sx={{fontSize: 16}}>Vista {img.id === "front" ? "Frontal" : "trasera"}</Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
          <IconButton onClick={() => handleNext(setCountInitial, setCountFinish, countFinish, countInitial)} sx={{height: 40, width: 40, display: "flex", justifyContent: "center", alignItems: "center"}} disabled={images.length === countFinish}>
            <ArrowForwardIos sx={{height: 20}}/>
          </IconButton> 
        </Box>  
        {/* OTHERS */}
        <Box sx={{background: "#92C5FC", p:2, my:2}}>
          <Typography sx={{fontWeight: "bold"}}>Otras imagenes</Typography>
        </Box>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <IconButton onClick={() => handlePrevious(setCountInitialOther, setCountFinishOther, countFinishOther, countInitialOther)} sx={{height: 40, width: 40, display: "flex", justifyContent: "center", alignItems: "center"}} disabled={countInitialOther === 0}>
            <ArrowBackIos sx={{height: 20}}/>
          </IconButton>     
          <Box>
            {otherImages.length > 0 && otherImages.slice(countInitialOther, countFinishOther).map((img, index) => {
              return (
                <Box key={index} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <img src={img.image} alt="img" height={200} width={200}/>
                  <Box>
                    <Typography sx={{fontSize: 16}}>Vista {img.id === "front" ? "Frontal" : "trasera"}</Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>
          <IconButton onClick={() => handleNext(setCountInitialOther, setCountFinishOther, countFinishOther, countInitialOther)} sx={{height: 40, width: 40, display: "flex", justifyContent: "center", alignItems: "center"}} disabled={otherImages.length === countFinishOther}>
            <ArrowForwardIos sx={{height: 20}}/>
          </IconButton> 
        </Box> 
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSprites;