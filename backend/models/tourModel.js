import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
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
    // ratingsAmount: {
    //   type: Number,
    //   default: 0,
    // },
    // ratingsAverage: {
    //   type: Number,
    //   default: 3.5,
    //   min: [1],
    //   max: [5],
    //   set: (val) => Math.round(val * 10) / 10,
    // },
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
      required: true,
      maxlength: 2000,
      text: true,
    },
    overview: {
      type: String,
      trim: true,
      required: true,
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
    // images: {
    //   type: Array,
    // },
    startDate: {
      type: Date,
    },
  },

  { timestamps: true }
)

const Tour = mongoose.model('Tour', tourSchema)

export default Tour
