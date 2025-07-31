const express = require('express')
const router = express.Router()
const { createProduct, getProducts, getProductsById } = require('../controllers/productControllers')

router.post('/create',createProduct)
router.get('/all',getProducts)
router.get('/:id',getProductsById)

module.exports = router