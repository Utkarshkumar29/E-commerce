const express=require('express')
const app=express()
const mongoose=require('mongoose')
const userRoutes=require('./routes/userRoutes')
const producRoutes=require('./routes/productRoutes')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://MERN:OabOhihuXOjL2fRB@cluster0.tiglnj5.mongodb.net/rejoice?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected")
}).catch((error) => {
    console.log("MongoDB Error:", error)
})

require('dotenv').config()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use('/api/auth', userRoutes)
app.use('/api/product', producRoutes)

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(5000,()=>{
    console.log("server running at 5000")
})