const express = require("express");

const members = require("./Members");
const uuid = require('uuid');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (request, response) => {
  response.send("this is home page");
});

app.get("/showAllUsers", (request, response) => {
  response.json(members);
});

app.get("/showUser/:userId", (request, response) => {
  // console.log(response.params.userId)
  const id = parseInt(request.params.userId);
  let user = members.filter((member) => member.id === id);
  // console.log(user)
  user.length !== 0
    ? response.status(200).json(user)
    : response.status(404).json({ message: `User not found with id ${id}` });
  // if (user.length !== 0) res.status(200).json(user)
  //     else res.status(404).json({message : `User not found with id ${id}`})
});

app.post("/addUser", (request, response) => {
//   console.log("User :", request.body);
    // const name = request.body.name;
    // const email = request.body.email;

    const {name, email} = request.body

    members.push({
        id:uuid.v4(),
        name,
        email
    })
    response.status(200).json(members)
});

app.delete("/deleteUser/:uid", (req, res) => {
    const id = parseInt(req.params.uid);
    // console.log(id)
    const found = members.some(member => member.id === id)
    
    if (found){
        const updatedMember = members.filter(member => member.id !== id)
        res.status(200).json(updatedMember)

    } else {
        res.status(400).json({message: `User not found with id ${id}`})
    }
})

app.put("/updateUser/:uid",(request,response)=>{
    const id = parseInt(request.params.uid);


    // response.send("data is updated successfully")
    const {name, email} = request.body;

    const found = members.some(member => member.id === id)

    if(found){
        members.forEach(member => {
            if(member.id === id){
                if(name) member.name = name
                if(email) member.mail = email
            }
        })

        response.status(200).json({
            message:`User with id ${id} updated`,members
        })
    } else {
        response.status(400).json({message:`User not found with id ${id}`})
    }

})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
