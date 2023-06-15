import express from 'express'
import initApp from './modules/app.router.js'
import dotenv from "dotenv"
import connectDB from './DB/connection.js'
const app = express()
const port = 3000
dotenv.config()
initApp(app,express)
connectDB().then(()=>{

    app.listen(process.env.PORT ||port, () => console.log(`Example app listening on port ${port}!`))
})