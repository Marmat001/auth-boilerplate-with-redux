import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema(
	{
		tour: {
			type: ObjectId,
			ref: 'Tour'
		},
		session: {},
		orderedBy: { type: ObjectId, ref: 'User' }
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
