import { Router } from "express"
import CartManager from "../CartManager.js"

const router = Router()
const manager = new CartManager()

// Llamar carrito por Id
router.get('/:cId', async (req, res) => {
    const {cId} = req.params
    const products = await manager.readCart(cId)
    if (!products){
        res.status(400).json({status:'error', msg:'Carrito no encontrado'})
    }
    res.send(products)
})

// Crear carrito
router.post('/', async (req, res) => {
    const {products} = req.body
    if (!products) res.send({status: 'error', msg:"Carrito vacío"})
    const cart = manager.createCart(products)
    if (cart) res.send({status: 'success', msg:"Carrito creado"})
})

// Agregar producto
router.post('/:cId/product/:pId', async (req, res) => {
    const {cId, pId} = req.params
    const {product} = req.body
    if(!product) res.send({status:'error', msg: 'No se enviaron productos para agregar'})

    await manager.addProduct(cId, pId)
})

export default router
