const express = require("express");
const dao = require('../bbdd/dao')
const send = require('../services/sendEmail')

const app = express();

//I create a database object
const bbdd = new dao()

app.post("/add",async(req, res) => {
    //I check if I receive the mandatory data otherwise I show an error
    if(req.body.email === undefined)
        res.status(404).json({err:"Email is mandatory"})
    else if(req.body.newsletter === undefined)
        res.status(404).json({err:"Newsletter is mandatory"})
    else if(req.body.birth === undefined)
        res.status(404).json({err:"Birth is mandatory"})
    else{
        try{
            //I check if that user / newsletter already exists
            const id = await bbdd.getUserId(req.body.email, req.body.newsletter)
            if (id.length == 0){
                //if it doesn't exist I do the insert
                const row = await bbdd.insertSubscription(req.body.name,req.body.email, req.body.birth, req.body.newsletter, req.body.gender)
                //I send the email
                send.sendEmail(req.body.email, req.body.newsletter)
                //In the response I send the id of the insertion
                res.send({id: row}).status(200)
            }else
                res.status(400).send({err: "User/ newsletter already created"})
        }catch(err){
            console.log(err)
            res.status(500).send()
        }
    }
})

app.get("/getNewsletters", async(req,res)=>{
      //I check if I receive the mandatory data otherwise I show an error
    if(req.query.email === undefined)
        res.status(404).json({err:"Email is mandatory"})
    else{
        try{
            //I get the newsletters
            const rows = await bbdd.getNewsletters(req.query.email)
            res.send(rows).status(200)
        }catch(err){
            res.status(500).send()
        }
    }
})

app.get("/getDetails", async(req,res)=>{
    //I check if I receive the mandatory data otherwise I show an error
    if(req.query.email === undefined)
        res.status(404).json({err:"Email is mandatory"})
    else if(req.query.newsletter === undefined)
        res.status(404).json({err:"Newsletter is mandatory"})
    else{
        try{
            //I get the details
            const rows = await bbdd.getDetails(req.query.email, req.query.newsletter)
            res.send(rows).status(200)
        }catch(err){
            res.status(500).send()
        }
    }
})

app.delete("/deleteNewsletters", async(req,res)=>{
     //I check if I receive the mandatory data otherwise I show an error
     if(req.body.email === undefined)
        res.status(404).json({err:"Email is mandatory"})
     else if(req.body.newsletter === undefined)
        res.status(404).json({err:"Newsletter is mandatory"})
     else{
        try{
            //I delete the newsletter / user
            await bbdd.deleteNewsletters(req.body.email, req.body.newsletter)
            res.send().status(200)
        }catch(e){
            res.status(500).send()
        }
    }
    
})

module.exports = app;