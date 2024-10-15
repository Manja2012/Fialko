import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    stripe_session: {
      id: {
        type: String, 
        required: true,
      },
      payment_status: {
        type: String, 
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      customer_email: {
        type: String, 
        required: true,
      },
    },
  },
  { timestamps: { createdAt: true } }
);
orderSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Order", orderSchema);
