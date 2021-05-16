const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      }
    ]
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No info found' });
          return;
    }
    res.json(dbTagData)
  })     .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id" ],
        through: ProductTag,
        as: 'tag_id'
      }
    ]
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No info found' });
          return;
    }
    res.json(dbTagData)
  })     .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
    product_id: req.body.product_id,
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
        where: {
            id: req.params.id
        }
    }
)
.then(dbTagData => {
  if (!dbTagData[0]) {
    res.status(404).json({ message: 'No data fount with this id' });
    return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
