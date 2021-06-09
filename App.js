import express from 'express'

import dotenv from 'dotenv'
import ConnectDB from './Database.js'
import CandidateRouter from './Router/CandidateRouter.js'
import TestScoreRouter from './Router/TestScoreRouter.js'




dotenv.config()
const app=express()

//Allows us to use body json thing to create posts

app.use(express.json({ extended: false }));


// funcation connect to app to database
ConnectDB()
const PORT=process.env.PORT||7766

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

app.use('/api', new CandidateRouter().candidateRouter)
app.use('/api', new TestScoreRouter().testScoreRouter)
