import mongoose from "mongoose";

const resultSchema = new Schema({
    passedTestCases: {
      type: Number,
      required: true,
    },
    failedTestCases: {
      type: Number,
      required: true,
    },
  }, { _id: false });

const submissionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Problem'
    },
    code:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    problemName: {
      type: String,
      required: true,
    },
    verdict: {
        type: String,
        required: true,
      },
      result: {
        type: resultSchema,
        required: true,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;