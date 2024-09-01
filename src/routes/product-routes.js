import { Router } from "express"
import ProductManager from "../services/ProductManager.js"

const router = Router()
const manager = new ProductManager()

router.get('/', (req, res) => {
    const products = manager.readProducts()
    res.send(products)
})

router.get('/:pId', (req, res) => {
    const pId = parseInt(req.params.pId)
    const product = manager.readProduct(pId)
    if (!product){
        res.status(400).json({status:'error', msg:'No se encontró el producto'})
    }
    res.send(product)
})

router.post('/', (req, res) => {
    const product = req.body
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        res.status(400).json({status: 'error', msg:'Campos vacíos'})
    }
    const newProduct = manager.createProduct(product)
    if (newProduct) res.send({status: 'success', msg:"Producto creado"})
})

router.put('/:pId', (req, res) => {
    const pId = parseInt(req.params.pId)
    let newData = req.body
    const updatedProduct = manager.updateProduct(pId, newData)
    if (!updatedProduct) {
        res.status(400).json({status:'error', msg:'Error al actualizar el producto'})
    }
    res.send({status: "success", msg: "Producto actualizado"})
})

router.delete('/:pId', (req, res) => {
    const pId = parseInt(req.params.pId)
    manager.deleteProduct(pId)
    res.send({status: "success", msg: "Producto eliminado"})
})



export default router