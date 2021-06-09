import express  from 'express'
const expressRouter=express.Router()
import Candidate from '../Model/CandidateModel.js'
import {isAuth,generateToken} from '../middleware/auth.js'
import Marks from '../Model/TestScoreModel.js'




class TestScoreRouter{

    testScoreRouter
    
    constructor(){
     this.testScoreRouter=expressRouter
     this.testScoreRouter.post('/insert_score', isAuth ,async(req,res)=>{

        try {
            
            const {first_round_Num,second_round_Num,third_round_Num}=req.body

            let candidate = await Candidate.findById(req.candidate._id)
            if (!candidate) return res.status(404).json("candidate not found");

             const newMarks = new Marks({
                second_round_Num,third_round_Num,
                first_round_Num,
                candidate: req.candidate._id,
            })

          const candidateResult=   await newMarks.save()

             return res.status(200).send({
                candidateResult
            })


        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)

        }
    


    
})



this.testScoreRouter.get('/max_marks_first_round-Num',isAuth ,async(req,res)=>{

    try {
        
        const maxNumber = await Marks.aggregate([
            {
              $group: {
                _id: null,
                maxNumber: { $max: '$first_round_Num' },
              },
            },
            { $sort: { _id: 1 } },
          ])
         return  res.send({ maxNumber });
          ;


    } catch (err) {
        return res.status(500).send(`${err.message}-${err.stack}`)
        
    }


    




})



this.testScoreRouter.get('/max_marks_second_round_Num',isAuth ,async(req,res)=>{

    try {
        
        const maxNumber = await Marks.aggregate([
            {
              $group: {
                _id: null,
                maxNumber: { $max: '$second_round_Num' },
              },
            },
            { $sort: { _id: 1 } },
          ])
         return  res.send({ maxNumber });
          ;


    } catch (err) {
        return res.status(500).send(`${err.message}-${err.stack}`)
        
    }

})



this.testScoreRouter.get('/max_marks_third_round_Num',isAuth ,async(req,res)=>{

    try {
        
        const maxNumber = await Marks.aggregate([
            {
              $group: {
                _id: null,
                maxNumber: { $max: '$third_round_Num' },
              },
            },
            { $sort: { _id: 1 } },
          ])
         return  res.send({ maxNumber });
          ;


    } catch (err) {
        return res.status(500).send(`${err.message}-${err.stack}`)
        
    }

})





this.testScoreRouter.get('/avg_marks_first_round_Num',isAuth ,async(req,res)=>{

    try {
        
        const avgNumber = await Marks.aggregate([
            {
              $group: {
                _id: null,
                avgNumber: { $avg: '$first_round_Num' },
              },
            },
            { $sort: { _id: 1 } },
          ])
         return  res.send({ avgNumber,avgNumber });
          ;


    } catch (err) {
        return res.status(500).send(`${err.message}-${err.stack}`)
        
    }


    




})






    this.testScoreRouter.get('/avg_marks_third_round_Num',isAuth ,async(req,res)=>{

        try {
            
            const avgNumber = await Marks.aggregate([
                {
                  $group: {
                    _id: null,
                    avgNumber: { $avg: '$third_round_Num' },
                  },
                },
                { $sort: { _id: 1 } },
              ])
             return  res.send({ avgNumber,avgNumber });
              ;
    
    
        } catch (err) {
            return res.status(500).send(`${err.message}-${err.stack}`)
            
        }


        
    
    
    
    
    
        })  


        this.testScoreRouter.get('/avg_marks_third_round_Num',isAuth ,async(req,res)=>{

            try {
                
                const avgNumber = await Marks.aggregate([
                    {
                      $group: {
                        _id: null,
                        avgNumber: { $avg: '$first_round_Num' },
                      },
                    },
                    { $sort: { _id: 1 } },
                  ])
                 return  res.send({ avgNumber,avgNumber });
                  ;
        
        
            } catch (err) {
                return res.status(500).send(`${err.message}-${err.stack}`)
                
            }

        })
        
        

}}

 export default  TestScoreRouter