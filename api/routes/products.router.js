const express = require('express');
const productsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, } = require('../schemas/product.schemas');

const router = express.Router();
const service = new productsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products)
})


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try{
    const {id} = req.params;
    const product = await service.findOne(id);
    res.json(product)
  }
  catch(error){
    next(error);
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res,next) => {
    try{
      const {id} = req.params;
      const body = req.body;
      const productUpdate = await service.update(id, body);
      res.json(productUpdate)
    }
    catch(error){
      next(error);
    }
  })
router.delete('/:id', async (req, res, next) => {
  try{

    const {id} = req.params;
    res.json(await service.delete(id))
  }
  catch(error){
    next(error);
  }
})

module.exports = router;