import { Button, Grid } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import BottomNavBar from '../components/General/BottomNavBar'
import NavBar from '../components/General/NavBar'

export default function Home() {
  

  return (
    <div>
      <NavBar/>
      <Grid container
      sx={{marginTop: 20}}
      justifyContent={'center'}
      direction={'row'}>
        <Grid item>
          <Link href="blakemasters">
            <Button>Ask Blake Masters</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="respondent">
            <Button>Answer Questions</Button>
          </Link>
        </Grid>
      </Grid>
      <BottomNavBar/>
    </div>
  )
}
