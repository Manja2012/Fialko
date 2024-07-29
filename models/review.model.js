import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const reviewSchema = mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    course: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Course', 
      required: true 
    },
    comment: {
      type: String,
      allowNull: false,
    },
    rating: {
      type: String,
      allowNull: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },

  },
  { timestamps: true }
);

reviewSchema.plugin(mongooseUniqueValidator);
export default mongoose.model("Review", reviewSchema);



