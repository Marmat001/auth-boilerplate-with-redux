import Tour from '../models/tourModel'
import slugify from 'slugify'

export const add = async (req, res) => {
  try {
    console.log(req.body)
    req.body.slug = slugify(req.body.title)
    res.json(await new Tour(req.body).save())
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

export const getAllTours = async (req, res) => {
  res.json(await Tour.find({}))
}

//.populate('continent'))
