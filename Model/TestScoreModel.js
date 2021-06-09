import mongoose from"mongoose";

let TestScore =new  mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
  },
  // first_Round_Num: {
  //   type: Number,
  //   // min:0,
  //   // max:10,
  //   // // default:0,
  //    required: true,
  // },

  // first_Round_Num: {
  //   type: Number,
  //    required: true,
  //    default:false
  // },

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

  // third_round:{
  //   type: Number,
  //   required: true,
  // },

  // marks: {
  //   type: Number,
  //   required: true,
  //   min:0,
  //   max:10,
  //   default:0
  // },

  date: {
    type: Date,
    default: Date.now(),
  },
  
});

const Marks = mongoose.model("Marks", TestScore);

 export default Marks;