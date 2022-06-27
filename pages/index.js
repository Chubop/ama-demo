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
      <Grid container>
        <Link href="blakemasters">
          <Button>Ask Blake Masters</Button>
        </Link>
        <Link href="respondent">
          <Button>Answer Questions</Button>
        </Link>
      </Grid>
      <BottomNavBar/>
    </div>
  )
}
