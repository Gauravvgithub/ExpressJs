const express = require("express")
const path = require("path")
const app = express()

// console.log(app)

// const middleware = (request, respnose, next) => {
//     console.log("hello i am middleware")
//     next()
// }
// app.use(middleware)

// app.use(express.static(path.join(__dirname, "public")))

app.get("/",(request, response)=>{
    response.send("this is get request")
})

app.get("/test",(request, response)=>{
    response.send("this is get request of test")
})

app.post("/",(request, response)=>{
    response.send("this is post request")
})

app.put("/",(request, response)=>{
    response.send("this is put request")
})

app.delete("/",(request, response)=>{
    response.send("this is delete request")
})


app.listen(3000,()=>{
    console.log(`server is running on port http://localhost:3000`)
})