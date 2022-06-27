import { Send } from "@mui/icons-material";
import { Autocomplete, Box, Button, Chip, FormControlLabel, FormGroup, Grid, IconButton, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../database/supabaseClient";


export default function AskQuestion(props){

  const [question, setQuestion] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Ask Blake Masters");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [asker, setAsker] = useState("anonymous");
  const [containsQMark, setContainsQMark] = useState(false);

  const [topics, setTopics] = useState([]);
  const [currTopic, setCurrTopic] = useState([]);

  async function submitQuestion(){
    const { data, error } = await supabase
    .from('Questions')
    .insert([
      { question: question, asker: asker, topics: currTopic.map(ct => ct.toLowerCase()) }
    ])
  }

  async function getTopics(){
    const { data, error } = await supabase
    .from('Topics')
    .select()
    for(let i = 0; i < data.length; i++){
      setTopics(topics => [...topics, data[i]['topic']])
    }
  }


  async function submitTopic(topic){
    if(!topics.includes(topic)){
      console.log(currTopic)
      const { data, error } = await supabase
      .from('Topics')
      .upsert([{ topic: topic.toLowerCase()}])
    }
  }


  function checkForQMark(){
    if(question.includes('?')){
      setContainsQMark(true)
    }
    else{
      setContainsQMark(false);
    }
  }


  const handleChange = (e) => {
    setQuestion(e.target.value);
    checkForQMark();
    console.log(question);
  }

  const handleAskerChange = (e) => {
    if(e.target.value !== ''){
      setAsker(e.target.value);
    }
    else{
      setAsker("anonymous")
    }
  }

  const handleSubmit = () => {
    setPlaceHolder("Sending...")
    submitQuestion();
    setQuestion("");
    currTopic.map((tpc) => {
      submitTopic(tpc.toLowerCase());
    });
    props.dialogClose();
  }

  useEffect(() => {
    getTopics();
  }, [])
  
  
  return(
    <div onClick={props.onClick}>
      <Box sx={{height: 300, p: 3}}>
        <TextField
        sx={{maxHeight: 250, overflowY: 'scroll'}}
        onChange={handleChange}
        value={question}
        multiline={true}
        placeholder={placeHolder}
        // InputProps={{endAdornment: 
        //   <Tooltip title="Submit">
        //     <IconButton onClick={handleSubmit}>
        //       <Send/>
        //     </IconButton>
        //   </Tooltip>}}
        />
        <Grid item>
          <TextField variant="standard" 
          placeholder="Enter name or initials (e.g. John S.)"
          onChange={handleAskerChange}
          sx={{maxHeight: 250, overflowY: 'scroll', textAlign: 'center'}}>
            
          </TextField>
        </Grid>



        <Grid item>
        <Autocomplete
        onChange={(e, v) => setCurrTopic(v)}
        multiple
        id="tags-filled"
        options={Array.from(new Set(topics))}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Topic"
          />
        )}
      />
        </Grid>
        

        <Grid item>
          <FormGroup>
            <FormControlLabel control={
            <Switch
            onClick={() => setIsAnonymous(!isAnonymous)}
            />} label="Ask anonymously" />
          </FormGroup>
        </Grid>

        <Grid item>
          <Button
          onKeyDownCapture={checkForQMark}
          onFocus={checkForQMark}
          onBlur={checkForQMark}
          sx={{width: '100%', color: 'black', backgroundColor: '#4285F4'}} 
          onClick={handleSubmit}>
            {isAnonymous ? `Submit as ${asker}` : "Submit as Arizona Resident"}
          </Button>
        </Grid>
      </Box>
    </div>
  )
}