import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  { timestamps: { createdAt: true } }
);
userSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("User", userSchema);
