import Tour from '../models/tourModel'
import slugify from 'slugify'

export const add = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title)
    res.json(await new Tour(req.body).save())
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

export const getAllTours = async (req, res) => {
  const tours = await Tour.find({})
    .limit(parseInt(req.params.amount))
    .populate('continent')
    .populate('country')
    .sort([['createdAt', 'desc']])
    .exec()

  res.json(tours)
}

export const remove = async (req, res) => {
  try {
    res.json(await Tour.findOneAndRemove({ slug: req.params.slug }).exec())
  } catch (error) {
    console.log(error)
    return res.status(400).send('Removal of tour unsuccessful')
  }
}

export const getTourInfo = async (req, res) => {
  res.json(
    await Tour.findOne({ slug: req.params.slug })
      .populate('continent')
      .populate('country')
      .exec()
  )
}
