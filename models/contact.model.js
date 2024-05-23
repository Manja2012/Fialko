import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
  
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true } }
);
contactSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Contact", contactSchema);
