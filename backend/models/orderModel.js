import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
	{
		tour: {
			type: ObjectId,
			ref: 'Tour'
		},
		
		paymentIntent: {},
		orderStatus: {
			type: String,
			default: "Payed",
			enum: [
				"Payed",
				"Not Payed"
			]
		},
		orderedBy: { type: ObjectId, ref: 'User' }
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order




