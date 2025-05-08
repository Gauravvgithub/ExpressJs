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

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
