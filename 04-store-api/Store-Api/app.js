require('dotenv').config()
require("express-async-errors")

const express = require("express")
const connectDB = require("./db/connect")
const PORT = process.env.PORT || 8000
const projectsRouter =  require("./routes/products")

const app = express()

//imported error handles 
const notFoundMiddleware =  require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler")


//json middle ware  that enables us to deal with json objects 
app.use(express.json())



// app.get("/", (req,res)=>{
//     res.send(`<h1>Starting my new Store Api </h1> <a href="api/v1/projects">API of projects</a> `)
// })

app.use("/api/v1/products", projectsRouter )


// involing error handlers
app.use(notFoundMiddleware)
app.use(errorMiddleware)


const start = async () => {
  try {
    await  connectDB(process.env.MONGO_URI)
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`)
    })
    
  } catch (error) {
    console.log(error)
    
  }
}

start()