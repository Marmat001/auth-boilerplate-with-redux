import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
    },
    parent: {type: ObjectId, ref: "Continent", required: true}
  },
  { timestamps: true }
)

const Country = mongoose.model('Country', countrySchema)

export default Country
