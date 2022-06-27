import { DataArray } from "@mui/icons-material";
import { Typography, Box, Grid, Stack, styled, Paper, Tabs, Tab, Divider, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../components/General/NavBar";
import QuestionCarousel from "../components/ProfilePage/QuestionCarousel";
import { supabase } from "../database/supabaseClient";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return(
    <div
    hidden={value !== index}>
      <Box p={3}>
        {children}
      </Box>
    </div>

  )
}

export default function Respondent(){

  const [data, setData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [localAnswer, setLocalAnswer] = useState(answer);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [topics, setTopics] = useState([]);
  const [unansweredQs, setUnansweredQs] = useState(0);
  const [tabQuestions, setTabQuestions] = useState([]);

  const newAnswerUpdate = supabase
  .from('Questions')
  .on('UPDATE', payload => {
    setData([...data, payload['new']])
  })
  .subscribe()

  const handleTabClick = (e) => {
    return
  }

  function getUnansweredQuestions(){
    for(let i = 0; i < data.length; i++){
      if(data[i].answer === null){
        setUnansweredQs(unansweredQs + 1);
      }
    }
  }

  async function submitAnswer(){
    const { data, error } = await supabase
    .from('Questions')
    .update({answer: localAnswer})
    .match({id: questionIdx})
  }

  async function updateAnswer(){
    const { data, error } = await supabase
    .from('Questions')
    .select('answer')
    .eq('id', questionIdx)
    // console.log('bepis united', data);
    if(data[0] !== undefined){
      setAnswer(data[0].answer);
      setLocalAnswer(data[0].answer);
    }
  }

  useEffect(() => {
    getQuestions();
    updateAnswer();
    if(data !== null){
      getUnansweredQuestions();
    }
  }, [questionIdx])

  async function getQuestions(){
    const { data, error } = await supabase
    .from('Questions')
    .select()
    setData(data);
    updateAnswer();
  }

  async function getTopics(){
    const { data, error } = await supabase
    .from('Topics')
    .select()
    for(let i = 0; i < data.length; i++){
      setTopics(topics => [...topics, data[i]['topic']])
    }
  }
  
  useEffect( () => {
    getQuestions();
    getTopics();
  }, []) 

  const [index, setIndex] = useState(0);


  const handleChange = (e, num) => {
    setIndex(num);
  };


  function setTabFromTopic(topic){
    let topics = data.filter((elm) => {
      elm['topics'].includes(topic)
    })
    setTabQuestions(topics)
  }


  const handleType = (e) => {
    // console.log(questionIdx);
    setLocalAnswer(e.target.value);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 100,
    height: 40
  }));

  return(
    <div>
      <NavBar/>
      <Grid       
      p={1}
      container
      justifyContent="flex-start"
      alignItems="center"
      direction="column">
        <Box sx={{border: '1px solid lightgray', borderRadius: 2, p: 2, textAlign: 'center'}}>
          <Typography>
            You have unanswered questions in <u>{Array.from(new Set(topics)).length}</u> categories.
          </Typography>
          {/* <Typography>
            <u>2</u> questions are uncategorized.
          </Typography> */}
        </Box>

        <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        indicatorColor="secondary"
        onChange={handleChange}
        value={tabValue}
        sx={{width: '100%'}}>
          {Array.from(new Set(topics)).map((elm, index) => {
            return(
              <Tab label={elm} value={index} onClick={() => {
                setTabValue(index)
                handleTabClick(elm)
              }
              }/>
            )
          })}
        </Tabs>

        <Divider sx={{width: 100, margin: 0}}/>

        {data && topics.length !== 0 &&
        
        <QuestionCarousel
        sendIdToParent={setQuestionIdx}
        questions={data.filter(obj => obj['topics'].includes(topics[tabValue].toLowerCase()))}/>
      
        // data.filter(obj => obj['topics'].includes(topics[tabValue])).map(x => <div>{topics[tabValue]}</div>)
        
        // data.map(x => <div><span>{x.topics}</span></div>)
        
        }
        {/* {data &&
        <TabPanel value={0} index={0}>
          {index}
          <QuestionCarousel
          sendIdToParent={setQuestionIdx}
          questions={data.filter(entry => data[tabValue]['topics'].includes('guns'.toLowerCase()))}/>
        </TabPanel>
        } */}
        

        {/* <TabPanel value={index} index={0}>
          {data &&
          <>
            <QuestionCarousel
            sendIdToParent={setQuestionIdx}
            questions={data.filter(entry => entry['topics'].includes(topics[tabValue].toLowerCase()))}/>
          </>
          }
        </TabPanel> */}
        {/* <TabPanel value={index} index={3}>cryptocurrency</TabPanel>
        <TabPanel value={index} index={4}>zoning laws</TabPanel> */}

        <Grid item>
          <TextField 
          value={localAnswer}
          onChange={handleType}
          placeholder="Answer question" 
          sx={{width: 300}}/>
        </Grid>

        <Grid item>
          <Button 
          placeholder={"Enter answer here."}
          onClick={submitAnswer}
          sx={{border: '1px solid lightgray', marginTop: 0.25, width: 300}}>
            Submit Answer
          </Button>
        </Grid>

        <Button onClick={() => console.log(data)}>click me</Button>



        {/* </Grid> */}
      </Grid>
      
    </div>
  )
}