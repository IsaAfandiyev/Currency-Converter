import "./index.css";
import React, {useEffect, useState} from "react";
import {FormControl,Paper,Select,TextField} from "@material-ui/core";
import axios from "axios";

function MainPage() {
    const [input,setInput] = useState(1);
    const [output,setOutput] = useState(13);
    const [inputCountry,setInputCountry] = useState([])
    const [outputCountry,setOutputCountry] = useState([]);
    const [inputValue,setInputValue]= useState(1);
    const [outputValue,setOutputValue] = useState(1);


    useEffect(()=>{
        axios.get('https://v6.exchangerate-api.com/v6/8b82e4a0b17ab45369669c22/latest/USD')
            .then((res)=>{
                setInputCountry(res.data.conversion_rates);
                setOutputCountry(res.data.conversion_rates);
            })
    },[])

    function convert(e)  {
        e.preventDefault();
        let num = (outputValue / inputValue ) * input;
        setOutput(num)
    }
    return (
        <div>
            <Paper>
                <h1>Convertor</h1>
                <form onSubmit={convert}>
                <div>
                    <TextField  variant={'outlined'} value={input || ''} onChange={(e)=>setInput(e.target.value)} autoComplete='off'/>
                    <FormControl variant={'outlined'} onChange={(e)=>{
                        setInputValue(e.target.value)}}>
                    <Select native>
                        {
                            Object.keys(inputCountry).map((val,i)=> <option key={i} value={inputCountry.value}>{val}</option>)
                        }
                    </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField  variant={'outlined'} value={output || ''}  />
                    <FormControl variant={'outlined'} onChange={(e)=>setOutputValue(e.target.value)} >
                        <Select native>
                            {
                                Object.keys(outputCountry).map((val,i)=> <option key={i} value={outputCountry.value}>{val}</option>)
                            }
                        </Select>
                    </FormControl>
                </div>
                </form>
            </Paper>
        </div>
    )
}
export default  MainPage;