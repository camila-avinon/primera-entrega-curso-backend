import express from 'express'
import ProductManager from '../services/ProductManager.js'
import { Server } from 'socket.io'
import productModel from '../services/db/models/productModel.js'

const router = express.Router()
const manager = new ProductManager()
const PORT = 8080

router.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit)
    if (!limit) limit = 10
    let page = parseInt(req.query.page)
    if (!page) page = 1
    let filter = req.query.filter
    let condition = req.query.condition
    let sort = req.query.sort
    if (!sort) sort = 'asc'
    const result = await productModel.paginate({},{limit: limit, page:1, sort:{price: sort}, lean: true})
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)
    console.log(result)
    res.render('products', result)
})

router.get('/home', (req, res) => {
    const products = manager.readProducts()
    res.render('home', {products})
})

router.get('/products/:pId', async (req, res) => {
    const pId = req.params.pId
    console.log(pId)
    const product = await productModel.findById(pId)
    console.log(product)
    res.render('detail', product)
})

export default router