import { QuestionMarkRounded, Share } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { supabase } from "../../database/supabaseClient";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

export default function QuestionCarousel(props){

  const [currQuestion, setCurrQuestion] = useState(0);
  const [currAskers, setCurrAskers] = useState(props.questions[0]['asks'])
  const [askedQuestion, setAskedQuestion] = useState(false);
  const [currAsker, setCurrAsker] = useState(props.questions[0]['asker'])
  const [currAnswer, setCurrAnswer] = useState(props.questions[0]['answer'])
  const [questionIdx, setQuestionIdx] = useState(props.questions[0]['id'])

  useEffect( () => {
    console.log(props.questions);
    setCurrAskers(props.questions[currQuestion]['asks'])
    if(props.sendIdToParent){
      props.sendIdToParent(props.questions[currQuestion]['id'])
    }
  }, [currQuestion] );


  async function handleAsk(){
    setAskedQuestion(!askedQuestion)

    if(askedQuestion == true){
      setCurrAskers(currAskers - 1)
      const { data, error } = await supabase
      .from('Questions')
      .update({asks: currAskers - 1})
      .match({question: props.questions[currQuestion]['question']})
    }
    else{
      setCurrAskers(currAskers + 1)
      const { data, error } = await supabase
      .from('Questions')
      .update({asks: currAskers + 1})
      .match({question: props.questions[currQuestion]['question']})
    }
  }


  const checkQuestionBounds = (idx) => {
    if(idx > props.questions.length - 1|| idx < 0){
      return false;
    }
    return true;
  }

  const handleChange = (index) => {
    setAskedQuestion(false);
    if(checkQuestionBounds(index) === true){
      setCurrQuestion(index);
      setCurrAsker(props.questions[index]['asker'])
      setCurrAnswer(props.questions[index]['answer'])
      if(props.sendIdToParent){
        props.sendIdToParent(props.questions[index]['id'])
      }
    }
  }

  return(
    <div>
      <Box sx={{p: 2, border: '1px solid lightgray', width: 300, borderRadius: 2, marginTop: 1, marginBottom: 0, fontStyle: 'italic', minHeight: 8}}>
        <Typography textAlign={'left'}>
          <span style={{color: 'gray'}}>{currAsker}</span> asks
        </Typography>
        <Carousel
        onChange={handleChange}
        emulateTouch={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}>

          {props.questions.map((q) => {
            return(
            <>
              <Typography textAlign={'left'}>
                {q['question']}
              </Typography>
            </>
            )
          })}
        </Carousel>
        <Typography color={'gray'} fontSize={12} display="inline">
          {currAskers} askers
        </Typography>
        <Tooltip title="Ask question">
          <ToggleButton sx={{float: 'right', padding: 0.125, borderRadius: 30}} edge="start" size="small"
          selected={askedQuestion}
          onChange={handleAsk}>
            <QuestionMarkRounded sx={{width: '1.5em'}}/>
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Share">
          <ToggleButton sx={{float: 'right', padding: 0.125, borderRadius: 30}} edge="start" size="small">
            <Share sx={{width: '1.5em'}}/>
          </ToggleButton>
        </Tooltip>
        <div style={{marginTop: 10, display: askedQuestion ? 'block' : 'none', color: 'gray'}}>
          <Typography>
            Blake Masters answered...
          </Typography>
          <Typography sx={{fontStyle: 'normal', color: 'black'}}>
            {currAnswer}
          </Typography>
        </div>
          <Button onClick={() => console.log(currAnswer)}>click me</Button>
      </Box>
    </div>
  )

}