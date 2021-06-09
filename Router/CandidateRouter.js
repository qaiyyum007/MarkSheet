import express  from 'express'
const expressRouter=express.Router()
import  bcrypt from'bcrypt'
import Candidate from '../Model/CandidateModel.js'
import {isAuth,generateToken} from'../middleware/auth.js'
import  jwt from 'jsonwebtoken'



class CandidateRouter{

    candidateRouter
    
    constructor(){
     this.candidateRouter=expressRouter
     this.candidateRouter.post('/registration' ,async(req,res)=>{

        try {
            
            const {name,email,password,}=req.body

             const exitCandidate= await Candidate.findOne({email})
             if(exitCandidate){
                 return res.send("email alreday exits")
             }
             const hasedPassword= await bcrypt.hash(password,12)

             const newCandidate = new Candidate({
                name, email, password: hasedPassword
            })

          const candidate=   await newCandidate.save()

             return res.status(200).send({
                candidate
            })


        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })



     this.candidateRouter.post('/login' ,async(req,res)=>{

        try {
            
            const {email,password}=req.body

             const candidate= await Candidate.findOne({email})
             if(!candidate){
                 return res.send("email does not exits")
             }
             const isMatch = await bcrypt.compare(password, candidate.password)
             if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

             const token=jwt.sign({
                 _id:candidate._id,
                 "email":candidate.email,
                 "name":candidate.userName,
                 "password":candidate.password,
            },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
      

             return res.status(200).send({
                 token
               
             })


        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })




     this.candidateRouter.get('/singleuser/:id' ,async(req,res)=>{

        try {
            const candidate = await Candidate.findById(req.params.id);
            return res.send(candidate)

        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })




     this.candidateRouter.get('/all_user', isAuth,async(req,res)=>{

        try {
            const candidates = await Candidate.find();
            return res.send({candidates})

        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })


     this.candidateRouter.delete('/delete_user/:id', isAuth,async(req,res)=>{

        try {
            const candidate = await Candidate.findOneAndDelete(req.params.id);
            if(!candidate){
                return res.send("candidate is not found")
            }
            return res.send(candidate)

        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })





     this.candidateRouter.get('/profile/:id',isAuth ,async(req,res)=>{

        try {
            const candidate = await Candidate.findById(req.candidate._id)
            if (candidate) {
                res.send({
                  _id: candidate._id,
                  name: candidate.name,
                  email: candidate.email
                
                })
            }else {
                return res.status(404).send(" candidate is not found")
            }

            return res.status(200).send(candidateProfie)

        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })





     this.candidateRouter.put('/update_profile/:id',isAuth ,async(req,res)=>{

        try {
            const candidate = await Candidate.findById(req.candidate._id)
            if (candidate) {
              
                candidate.email = req.body.email || candidate.email
                candidate.name = req.body.name || candidate.name

                const updatedCandidate = await candidate.save()

                res.send({
                  _id: candidate._id,
                  name: candidate.name,
                  email: candidate.email,
                  token: generateToken(candidate._id),
                })
            }else {
                return res.send(" user is not found")
            }

            return res.status(200).send(updatedCandidate)

        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })



     





     this.candidateRouter.put('/change_Password/:id' ,async(req,res)=>{

        try {
            const {password}=req.body
             
            const hasedPassword= await bcrypt.hash(password,10)
            const resetPassword=   await Candidate.findOneBy(req.params.id, {
                password: hasedPassword
            })
            if(!resetPassword){
                return res.send("candidate is not found")
            }
            return res.status(201).send("password change Suceesfull", resetPassword )

        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
        }
     })


    }
}

 export default  CandidateRouter