const express=require("express");    
const app=express();
import fs,{write} from "node:fs";
import { nanoid } from "nanoid";
app.use(express.json());

const writeFiles=(ele)=>{
    fs.writeFiles("records.json",ele);
}

app.post("/urlShortner",(req,res)=>{
    const url=req.body.url;
    console.log(url);

    const info=fs.readFileSync('records.json');
    let urlData=JSON.parse(info.toString());

    urlData[shortURL]=url;

    writeFile(JSON.stringify(urlData));
    res.json({
        success:true,
        shortURL:`https://localhost:5000/${shortURL}`
    })
})

app.get("./shortURL",(req,res)=>{
    
})
app.listen(5000,()=>{
    console.log("Server is running");
})

