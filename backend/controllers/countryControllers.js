import Country from '../models/countryModel'
import slugify from 'slugify'

export const add = async (req, res) => {
  const { name, parent } = req.body
  try {
   res.json(await new Country({ name, parent, slug: slugify(name) }).save())

  } catch (error) {
    res.status(400).send('Country creation unsuccessful')
  }
}

export const showAll = async (req, res) => {
  res.json(await Country.find({}).sort({ createdAt: -1 }).exec())
}
export const show = async (req, res) => {
  res.json(await Country.findOne({ slug: req.params.slug }).exec())
}

export const update = async (req, res) => {
  const { name, parent } = req.body

  try {
    res.json(
      await Country.findOneAndUpdate(
        { slug: req.params.slug },
        { name, parent, slug: slugify(name) },
        { new: true }
      )
    )
  } catch (error) {
    res.status(400).send('Update unsuccessful')
  }
}

export const remove = async (req, res) => {
  try {
    res.json(await Country.findOneAndDelete({ slug: req.params.slug }))
  } catch (error) {
    res.status(400).send('Removal of country unsuccessful')
  }
}
