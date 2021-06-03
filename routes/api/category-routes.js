const router = require('express').Router();
const { Category, Product } = require('../../models');

// Pulling all categories by products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Getting a product by it's id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'There was no product found with that id number.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Allows for the creation of a new category
router.post('/', async (req, res) => {
  try {
    const inputtedData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(inputtedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Allows for updating category by it's id.
router.put('/:id', async (req, res) => {
    try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(404).json({ message: 'There is no category with this id.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Allows for the deletion of a category by it's id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'There was no category found with that id number.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
