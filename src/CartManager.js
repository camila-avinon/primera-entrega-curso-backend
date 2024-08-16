import fs from 'fs/promises'
import path from 'path'

class CartManager {
    constructor() {
        this.filePath = path.join('./', 'carritos.json')
    }

    async readCart(cId){
        try {
            const data = await fs.readFile(this.filePath, 'utf-8')
            const carts = JSON.parse(data)
            const cart = carts.find(c => c.id == cId)
            return cart.products
        } catch (e) {
            console.error(`Error al buscar el carrito: ${e}`)
        }
    }

    async createCart(products){
        try {
            let carts = []
            let cart = {}
            try {
                const data = await fs.readFile(this.filePath)
                carts = JSON.parse(data)
                const newId = Math.floor(Math.random() * 1000 + 1)
                cart = {id:newId, products:products}
                console.log(cart)
                carts.push(cart)
            }catch(e){
                console.error(`Error al leer el archivo: ${e}`)
            }

            // Escribir archivo
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2), 'utf-8')
            return cart
        } catch (e) {
            console.error(`Error al crear producto: ${e}`)
        }
    }

    async addProduct(cId, pId){
        try {
            const data = await fs.readFile(this.filePath, 'utf-8')
            const carts = JSON.parse(data)
            const cart = carts.find(c => c.id == cId)
            let cartProduct = cart.products.find(p => p.id == pId)
            if (cartProduct){
                cartProduct.quantity ++
            } else {
                cart.products.push({id: parseInt(pId), quantity:1})
            }
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2), 'utf-8')
            
        } catch (e){
            console.error(`Error al buscar el carrito: ${e}`)
        }
    }
}

export default CartManager