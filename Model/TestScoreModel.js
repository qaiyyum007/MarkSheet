import mongoose from"mongoose";

let TestScore =new  mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
  },


  first_round_Num: {
    type: Number,
    min:0,
    max:10,
    required: true,
  },

  second_round_Num: {
    type: Number,
    min:0,
    max:10,
    required: true,
  },
  third_round_Num: {
    type: Number,
    min:0,
    max:10,
    required: true,
  },

  

  date: {
    type: Date,
    default: Date.now(),
  },
  
});

const Marks = mongoose.model("Marks", TestScore);

 export default Marks;