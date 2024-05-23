import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      allowNull: false,
    },
    content: {
      type: String,
      allowNull: false,
    },
    category: {
      type: String,
      allowNull: false,
    },
    price: {
      type: Number,
      allowNull: false,
    },
    picture: {
      type: String,
      allowNull: false,
    },
    review: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review', 
    }],
  },
  { timestamps: true }
);
courseSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Course", courseSchema);
