import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: String,
    image: {
			type: String
		},
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'adventurer',
    },
    stripe_account_id: '',
		stripeSession: {}

    // wishlist: [{ type: ObjectId, ref: "Destination" }],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
