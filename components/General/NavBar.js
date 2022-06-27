import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { MoreVert, ArrowBack, Search } from '@mui/icons-material';

export default function NavBar(){

  return(
    <div>
      <AppBar 
      position="static" 
      elevation={0}
      sx={{backgroundColor: '#fff', color: 'black'}}>
        <Toolbar>
          <Box display="flex" flexGrow={1} sx={{alignItems: 'center'}}>
            <IconButton
            size="small"
            color="inherit"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            >
              <ArrowBack/>
            </IconButton>

            <Typography
            component="div"
            sx={{fontWeight: 'bold'}}>
              ama.bot
            </Typography>
          </Box>


            <IconButton
            size="small"
            color="inherit"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            >
              <Search/>
            </IconButton>

            <IconButton
            size="small"
            color="inherit"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            >
              <MoreVert/>
            </IconButton>

        
        </Toolbar>
      </AppBar>
    </div>
  )
}