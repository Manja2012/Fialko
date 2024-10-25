import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const courseBasketDataSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  courseName: {
    type: String,
  },
  unitPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  }
})

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    basket: {
      type: [courseBasketDataSchema],
      default: undefined,
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
