import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      // text: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Extreme'],
    },
    booked: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      // text: true,
      required: true,
    },
    overview: {
      type: String,
      trim: true,
      required: true,
      // text: true,
    },
    continent: {
      type: ObjectId,
      ref: 'Continent',
    },
    country: [
      {
        type: ObjectId,
        ref: 'Country',
      },
    ],
    images: {
      type: Array,
    },
    startDate: {
      type: Date,
    },
    address: {
      type: String
    },
    areaLongitude: Number,
    areaLatitude: Number,
    startLongitude: Number,
    startLatitude: Number,
  },

  { timestamps: true }
)

const Tour = mongoose.model('Tour', tourSchema)

export default Tour
