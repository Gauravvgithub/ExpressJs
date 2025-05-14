const express = require("express");

const post = require("./post-details");
const uuid = require('uuid');
const postDetails = require("./post-details");
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (request, response) => {
  response.send("this is home page");
});

app.get("/showAllPosts", (request, response) => {
  response.json(post);
});

app.get("/showPosts/:userId", (request, response) => {
  // console.log(response.params.userId)
  const id = parseInt(request.params.userId);
  let user = postDetails.filter((post) => post.id === id);
  // console.log(user)
  user.length !== 0
    ? response.status(200).json(user)
    : response.status(404).json({ message: `User not found with id ${id}` });
  // if (user.length !== 0) res.status(200).json(user)
  //     else res.status(404).json({message : `User not found with id ${id}`})
});

app.post("/addPost", (request, response) => {
//   console.log("User :", request.body);
    // const name = request.body.name;
    // const email = request.body.email;

    const {author, email, title, description} = request.body

    if(author === "") {
        return response.status(400).json({message:`Please enter author name `})
    }
 
    postDetails.push({
        id:uuid.v4(),
        author,
        email,
        title,
        description
    })
    response.status(200).json(postDetails)
});

app.delete("/deletePost/:uid", (req, res) => {
    const id = parseInt(req.params.uid);
    // console.log(id)
    const found = postDetails.some(post => post.id === id)
    
    if (found){
        const updatedPost = postDetails.filter(post => post.id !== id)
        res.status(200).json(updatedPost)

    } else {
        res.status(400).json({message: `User not found with id ${id}`})
    }
})

app.put("/updatePost/:uid",(request,response)=>{
    const id = parseInt(request.params.uid);


    // response.send("data is updated successfully")
    const {author, email, title, description} = request.body;

    const found = postDetails.some(post => post.id === id)

    if(found){
        postDetails.forEach(post => {
            if(post.id === id){
                if(author) post.author = author
                if(email) post.email = email
                if(title) post.title = title
                if(description) post.description = description
            }
        })

        response.status(200).json({
            message:`User with id ${id} updated`, postDetails
        })
    } else {
        response.status(400).json({message:`User not found with id ${id}`})
    }

})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});