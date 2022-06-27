import { AppBar, Box, Dialog, Grid, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { MoreVert, ArrowBack, Search, QuestionMark, PlusOne, Add, Send } from '@mui/icons-material';
import { useEffect, useState } from "react";
import AskQuestion from "./AskQuestion";

export default function BottomNavBar(){

  const [isOutsideClick, setIsOutsideClick] = useState(false);
  const [isInsideClick, setIsInsideClick] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  

  const handleClickOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  }

  useEffect( () => {
    if(isInsideClick === false && isOutsideClick === true){
      setIsDialogOpen(false);
    }
    setIsInsideClick(false);
    setIsOutsideClick(false);
  }, [isOutsideClick]);

  return(
    <div>
      <AppBar 
      elevation={1}
      position="fixed"
      aria-label="ask question"
      sx={{backgroundColor: '#fff', color: 'black', top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Tooltip title="Ask a question">
            <IconButton color="primary" sx={{margin: '0 auto'}} onClick={handleClickOpen}>
              <Add/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Dialog
      sx={{margin: 0, width: '100%'}}
      open={isDialogOpen}
      onClick={() => setIsOutsideClick(true)}>
        <AskQuestion onClick={() => setIsInsideClick(true)} dialogClose={closeDialog}/>
      </Dialog>
    </div>
  )
}