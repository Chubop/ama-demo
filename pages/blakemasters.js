import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../components/General/NavBar";
import AskProfile from "../components/ProfilePage/AskProfile";
import Header from "../components/ProfilePage/Header";
import QuestionCarousel from "../components/ProfilePage/QuestionCarousel";
import { supabase } from "../database/supabaseClient";



export default function ProfilePage(){

  const [data, setData] = useState(null);

  async function getQuestions(){
    const { data, error } = await supabase
    .from('Questions')
    .select()
    setData(data);
    console.log(data);
  }

  const newQuestionUpdate = supabase
  .from('Questions')
  .on('INSERT', payload => {
    console.log('New question!', payload)
    setData([...data, payload['new']])
  })
  .subscribe()

  const newLikeUpdate = supabase
  .from('Questions')
  .on('UPDATE', payload => {
    console.log('Like update!', payload)
    for(let i = 0; i < data.length; i++){
      let id = data[i]['id']
      if(id === payload['new']['id']){
        data[i] = payload['new']
      }
    }
  })
  .subscribe()
  

  useEffect( () => {
    getQuestions();
  }, []) 

  return(
    <div>
      <NavBar/>
      <Grid       
      p={1}
      container
      justifyContent="flex-start"
      alignItems="center"
      direction="column">
        <Header/>
        {data &&
        <>
          <QuestionCarousel
          questions={data}/>
          <Divider sx={{width: 100, margin: 2}}/>
          <AskProfile/>
        </>
        }

      </Grid>
    </div>
  )
}