import { Router } from "express"
import CartManager from "../services/CartManager.js"
import { cartModel } from "../services/db/models/cartModel.js"

const router = Router()
const manager = new CartManager()

// Llamar carrito por Id
router.get('/:cId', async (req, res) => {
    const cId = req.params.cId
    try{
        const cart = await cartModel.findById(cId).populate('products')
        console.log(cart)
        if (!cart){
            res.status(400).json({status:'error', msg:'Carrito no encontrado'})
        }
        res.send(cart)
    }catch(e){
        console.log(e)
    }
})

// Crear carrito
router.post('/', async (req, res) => {
    const {products} = req.body
    if (!products) res.send({status: 'error', msg:"Carrito vacío"})
    const cart = await cartModel.create({products})
    if (cart) res.send({status: 'success', msg:"Carrito creado"})
})

// Agregar producto
router.post('/:cId/product/:pId', async(req, res) => {
    const {cId, pId} = req.params
    const updatedProduct = await cartModel.findById(cId)
    const product = updatedProduct.products.find(p => p._id == pId)
    product.quantity += 1
    await updatedProduct.save()
    res.send({status: "Success", msg:"Producto agregado correctamente"})
})

export default router
