const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Pulling all categories by products
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Getting a product by it's id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'There was no tag found product found with that id number' })
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Allows for the creation of a new tag
router.post('/', async (req, res) => {
  try {
    const inputtedData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(inputtedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Allows for updating tag by it's id.
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData[0]) {
      res.status(404).json({ message: 'There is no tag with this id.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Allows for the deletion of a tag by it's id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'There was no tag found with that id number' });
      return;
    }
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
