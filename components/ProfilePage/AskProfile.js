import { Send } from "@mui/icons-material";
import { IconButton, Switch, TextField, Tooltip, Typography, Grid, FormGroup, FormControlLabel } from "@mui/material";
import { useState } from "react";
import BottomNavBar from "../General/BottomNavBar";


export default function AskProfile(){

  const [question, setQuestion] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Ask Blake Masters");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleChange = (e) => {
    setQuestion(e.target.value);
  }

  const handleSubmit = () => {
    setPlaceHolder("Sent")
    setQuestion("");
  }


  return(
    <div>
      <BottomNavBar/>
    </div>
  )
}