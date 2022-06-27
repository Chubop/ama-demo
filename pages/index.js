import Head from 'next/head'
import Image from 'next/image'
import BottomNavBar from '../components/General/BottomNavBar'
import NavBar from '../components/General/NavBar'

export default function Home() {
  

  return (
    <div>
      <NavBar/>
      <BottomNavBar/>
    </div>
  )
}
