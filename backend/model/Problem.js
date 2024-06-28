import mongoose from "mongoose";

/*const sampleTestCaseSchema = new Schema({
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    }
  }, { _id: false });*/

const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
      type:String,
      required:true
  },
    level:{
        type:String,
        required:true
    },
    inputFormat:{
        type:String,
        required:true
    },
    outputFormat:{
        type:String,
        required: true
    },
   /* constraints:{
        type:String,
        required:true
    },*/
    //sampleTestCases: [sampleTestCaseSchema],
   createdAt: {
    type: Date,
    default: Date.now,
  },
   updatedAt: {
    type: Date,
    default: Date.now,
  }

});

problemSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  problemSchema.pre('findOneAndUpdate', function(next) {
    this._update.updatedAt = Date.now();
    next();
  });
  
  const Problem = mongoose.model('Problem', problemSchema);
  
  export default Problem;