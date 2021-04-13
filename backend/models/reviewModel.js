const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)


const Review = mongoose.model('Review', reviewSchema)

export default Review
