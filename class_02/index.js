const express = require("express")
const app = express()

const PORT = 3000

const members = [
    {
        id:1,
        name:"Gaurav",
        mail:"gaurav@meta.com",
        status:"active"
    },
    {
        id:2,
        name:"Hansu",
        mail:"hansu@meta.com",
        status:"active"
    },
    {
        id:3,
        name:"sam",
        mail:"sam@meta.com",
        status:"inactive"
    },
    {
        id:4,
        name:"suraj",
        mail:"suraj@meta.com",
        status:"active"
    },
    {
        id:5,
        name:"raj",
        mail:"raj@meta.com",
        status:"active"
    }

]

app.get("/",(request,response)=>{
    response.send("this is home page")
})

app.get("/showAllUsers",(request, response)=>{
    response.json(members)
})

app.get("/showUser/:userId",(request, response)=>{
    // console.log(response.params.userId)
     const id = parseInt(request.params.userId);
     let user = members.filter(member => member.id === id);
     // console.log(user)
     (user.length !== 0 ) ? response.status(200).json(user) : response.status(404).json({message : `User not found with id ${id}`})
     // if (user.length !== 0) res.status(200).json(user) 
     //     else res.status(404).json({message : `User not found with id ${id}`})
})



app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})