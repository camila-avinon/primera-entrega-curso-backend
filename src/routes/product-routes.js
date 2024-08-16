import { Router } from "express"
import ProductManager from "../ProductManager.js"

const router = Router()
const manager = new ProductManager()

router.get('/', async (req, res) => {
    const products = await manager.readProducts()
    res.send(products)
})

router.get('/:productId', async (req, res) => {
    const {productId} = req.params
    const product = await manager.readProduct(productId)
    if (!product){
        res.status(400).json({status:'error', msg:'Producto no encontrado'})
    }
    res.send(product)
})

router.post('/', async (req, res) => {
    const product = req.body
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
        res.status(400).json({status: 'error', msg:'Campos vacíos'})
    }
    const newProduct = await manager.createProduct(product)
    if (newProduct) res.send({status: 'success', msg:"Producto creado"})
})

router.put('/:productId', async (req, res) => {
    const {productId} = req.params
    let newData = req.body
    newData.id = parseInt(productId)
    const updatedProduct = manager.updateProduct(productId, newData)
    if (!updatedProduct) {
        res.status(400).json({status:'error', msg:'Error al actualizar el producto'})
    }
    res.send({ status: "success", msg: "Producto actualizado", payload: updatedProduct })
})

router.delete('/:productId', async (req, res) => {
    const {productId} = req.params
    await manager.deleteProduct(productId)
    res.send({status:'success', 'msg':'Producto eliminado'})
})


export default router