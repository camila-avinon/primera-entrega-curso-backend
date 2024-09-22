import { Router } from "express"
import ProductManager from "../services/ProductManager.js"
import productModel from "../services/db/models/productModel.js"

const router = Router()
const manager = new ProductManager()

router.get('/', async (req, res) => {
    let limit = parseInt(req.query.limit)
    if (!limit) limit = 10
    let page = parseInt(req.query.page)
    if (!page) page = 1
    let filter = req.query.filter
    let condition = req.query.condition
    console.log(req.query)
    // console.log(condition)
    // console.log(filter)
    try{
        let products = await productModel.paginate({filter:condition},{limit: limit, page:1})
        console.log(products)
        // if (!filter || !condition){
        //     let products = await productModel.paginate({},{limit: limit, page:1})
        // } else {
        //     let products = await productModel.paginate({filter:"TV"},{limit: limit, page:1})
        //     res.send({status:'success', payload:products.docs, totalPages:products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page:page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage})
        // }
        res.send({status:'success', payload:products.docs, totalPages:products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, page:page, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage})
    }catch(e){
        console.log('Error al buscar los productos: ', e)
        res.status(500).json({error:'No se pudieron encontrar los productos', msg:e})
    }
})

router.get('/:pId', async (req, res) => {
    const pId = req.params.pId
    try{
        const product = await productModel.findById(pId)
        if (!product){
            res.status(400).json({status:'error', msg:'No se encontró el producto'})
        }
        res.send({result:'success', payload:product})
    }catch(e){
        console.log('No se encontró el producto: ', e)
        res.status(500).json({error:'No se encontró el producto', msg:e})
    }
})

router.post('/', async (req, res) => {
    const {title, description, code, price, stock, category} = req.body
    try{
        if (!title || !description || !code || !price || !stock || !category){
            res.status(400).json({status: 'error', msg:'Campos vacíos'})
        }
        const newProduct = await productModel.create({title, description, code, price, stock, category})
        res.status(201).send({status: 'success', payload:newProduct._id})
    }catch(e){
        console.log('Error al crear el producto: ', e)
        res.status(500).json({error:'Error al crear el producto', msg:e})
    }
})

router.put('/:pId', async (req, res) => {
    const pId = req.params.pId
    let newData = req.body
    try {
        const updatedProduct = await productModel.updateOne({_id:pId}, newData)
        if (!updatedProduct) {
            res.status(400).json({status:'error', msg:'Error al actualizar el producto'})
        }
        res.send({status: "success", payload: updatedProduct})
    } catch (e) {
        console.log('Error al actualizar el producto: ', e)
        res.status(500).json({error:'Error al actualizar el producto', msg:e})
    }
})

router.delete('/:pId', async (req, res) => {
    const pId = req.params.pId
    try{
        let result = await productModel.deleteOne({_id:pId})
        res.send({status: "success", payload: result})
    }catch(e){
        console.log('Error al eliminar el producto: ', e)
        res.status(500).json({error:'Error al eliminar el producto', msg:e})
    }
})



export default router