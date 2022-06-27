import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import profilePic from '../../public/blank_profile_picture.jpeg';

export default function Header(){
  return(
    <div>
        <Grid item sx={{textAlign: 'center'}}>
          <Image
          style={{borderRadius: '50%'}}
          width={100}
          height={100}
          src={profilePic}/>
        </Grid>


        <Grid item sx={{textAlign: 'center'}}>
          <Typography variant={"h5"}>
            Blake Masters 🇺🇸
          </Typography>
          <Typography variant={"h6"} sx={{color: 'gray'}}>
           ?<span>bgmasters</span> 
          </Typography>
          <Typography>
            Running for U.S. Senate in Arizona 🌵
          </Typography>
        </Grid>

    </div>
  )
}