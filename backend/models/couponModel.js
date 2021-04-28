const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon
