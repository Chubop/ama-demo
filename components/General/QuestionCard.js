import { QuestionMarkRounded, Share } from "@mui/icons-material";
import { Box, Grid, IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";

import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

export default function QuestionCard(props){

  const [currQuestion, setCurrQuestion] = useState(0);
  const [currAskers, setCurrAskers] = useState(Object.values(props.questions)[currQuestion])
  const [askedQuestion, setAskedQuestion] = useState(false);

  const checkQuestionBounds = (idx) => {
    if(idx > props.questions.length - 1 || idx < 0){
      console.log(currQuestion);
      return false;
    }
    return true;
  }

  const handleChange = (index) => {
    setAskedQuestion(false);
    setCurrQuestion(index);
    setCurrAskers(Object.values(props.questions)[index])
  }

  const nextQuestion = () => {
    const newIndex = currQuestion + 1;
    if(checkQuestionBounds(newIndex) == true){
      setCurrQuestion(currQuestion + 1);
    }  
  }

  const prevQuestion = () => {
    const newIndex = currQuestion - 1;
    if(checkQuestionBounds(newIndex) == true){
      setCurrQuestion(currQuestion - 1);
    }
  }


  return(
    <div>
      <Box sx={{p: 2, border: '1px solid lightgray', width: 300, borderRadius: 2, marginBottom: 0, fontStyle: 'italic', minHeight: 8}}>
        <Carousel
        onChange={handleChange}
        emulateTouch={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}>
          {Object.keys(props.questions).map((q) => {
            return(
            <Typography key={q} textAlign={'left'}>
              {q}
            </Typography>
            )
          })}
        </Carousel>
        <Typography color={'gray'} fontSize={12} display="inline">
          {currAskers} askers
        </Typography>
        <Tooltip title="Ask question">
          <ToggleButton sx={{float: 'right', padding: 0.125, borderRadius: 30}} edge="start" size="small"
          selected={askedQuestion}
          onChange={() => {
            setAskedQuestion(!askedQuestion)
            if(askedQuestion == true){
              setCurrAskers(currAskers - 1)
            }
            else{
              setCurrAskers(currAskers + 1)
            }
          }}>
            <QuestionMarkRounded sx={{width: '1.5em'}}/>
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Share">
          <ToggleButton sx={{float: 'right', padding: 0.125, borderRadius: 30}} edge="start" size="small">
            <Share sx={{width: '1.5em'}}/>
          </ToggleButton>
        </Tooltip>
      </Box>
    </div>
  )

}