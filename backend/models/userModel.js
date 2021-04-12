import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'adventurer',
    },
    address: String,
    cart: {
      type: Array,
      default: [],
    },
    // wishlist: [{ type: ObjectId, ref: "Destination" }],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
