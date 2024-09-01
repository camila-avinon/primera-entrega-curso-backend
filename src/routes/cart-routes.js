import { Router } from "express"
import CartManager from "../services/CartManager.js"

const router = Router()
const manager = new CartManager()

// Llamar carrito por Id
router.get('/:cId', (req, res) => {
    const {cId} = req.params
    const products = manager.readCart(cId)
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
router.post('/:cId/product/:pId', (req, res) => {
    const {cId, pId} = req.params
    manager.addProduct(cId, pId)
    res.send({status: "Success", msg:"Producto agregado correctamente"})
})

export default router
