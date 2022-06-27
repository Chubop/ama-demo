import { Box, Button } from "@mui/material";


export default function Topic(props){
  return(
    <Button disabled sx={{backgroundColor: '#4285F4', color: 'white !important', marginLeft: 0.5, marginRight: 0.5}}>
      {props.children}
    </Button>
  )
}