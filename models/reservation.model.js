import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const reservationSchema = mongoose.Schema(
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
      date: {
        type: Date,
        default: Date.now,
      },
  },
  { timestamps: { createdAt: true } }
);
reservationSchema.plugin(mongooseUniqueValidator);

export default mongoose.model("Reservation", reservationSchema);
