import mongoose from 'mongoose'

const continentSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
)

const Continent = mongoose.model('Continent', continentSchema)

export default Continent
