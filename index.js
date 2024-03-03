import express from "express";
const app=express();
import fs from "node:fs";
import { nanoid } from "nanoid";
import bodyParser from "body-parser";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
const writeFiles=(ele)=>{
    fs.writeFileSync("records.json",ele);
}

app.post("/urlShortner",(req,res)=>{
    const LongURL=req.body.url;
    const shortURL=nanoid(5);
    const info=fs.readFileSync('records.json');
    let urlData=JSON.parse(info.toString());

    urlData[shortURL]=LongURL;

    writeFiles(JSON.stringify(urlData));
    res.json({
        success:true,
        shortURL:`https://urlshortner-6iab.onrender.com/${shortURL}`
    })
})

app.get("/:shortURL",(req,res)=>{
    console.log(req.params.shortURL);
    const record=fs.readFileSync("records.json")  
    const data=JSON.parse(record.toString());
    if(data[req.params.shortURL]){
        return res.redirect(data[req.params.shortURL]);
    }
})
app.listen(5000,()=>{
    console.log("Server is running");
})

