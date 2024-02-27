import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'

function Transition(props) {
    return <Slide {...props} direction="right" />;
}
export default function Error({ msg }) {
  return (
    <Snackbar open={msg !== null}
        autoHideDuration={6000}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        TransitionComponent={Transition}
    >        
        <Alert severity="error">{msg}</Alert>
      </Snackbar>
  )
}
