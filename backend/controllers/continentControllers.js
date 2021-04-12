import Continent from '../models/continentModel'
import slugify from 'slugify'

export const add = async (req, res) => {
  const { name } = req.body
  try {
    res.json(await new Continent({ name, slug: slugify(name) }).save())
  } catch (error) {
    res.status(400).send('Continent creation unsuccessful')
  }
}

export const showAll = async (req, res) => {
  res.json(await Continent.find({}).sort({ createdAt: -1 }).exec())
}
export const show = async (req, res) => {
  res.json(await Continent.findOne({ slug: req.params.slug }).exec())
}

export const update = async (req, res) => {
  const { name } = req.body

  try {
    res.json(
      await Continent.findOneAndUpdate(
        { slug: req.params.slug },
        { name, slug: slugify(name) },
        { new: true }
      )
    )
  } catch (error) {
    res.status(400).send('Update unsuccessful')
  }
}

export const remove = async (req, res) => {
  try {
    res.json(await Continent.findOneAndDelete({ slug: req.params.slug }))
  } catch (error) {
    res.status(400).send('Removal of continent unsuccessful')
  }
}
