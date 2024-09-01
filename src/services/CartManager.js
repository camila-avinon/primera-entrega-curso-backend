import fs from 'fs/promises'
import path from 'path'

const filePath = path.resolve('data', 'carritos.json')

export default class CartManager {
    constructor() {
        this.carts = []
        // this.init()
    }

    // async init() {
    //     try {
    //         const data = await fs.readFile(filePath, 'utf-8')
    //         this.carts = JSON.parse(data)
    //     } catch (e) {
    //         console.log(e)
    //         this.carts = []
    //     }
    // }

    // saveFile(){
    //     fs.writeFile(filePath, JSON.stringify(this.carts, null, 2))
    // }

    // readCart(cId){
    //     const cart = this.carts.find(c => c.id == cId)
    //     return cart.products
    // }

    // createCart(products){
    //     const newId = Math.floor(Math.random() * 1000 + 1)
    //     const cart = {id:newId, products:products}
    //     this.carts.push(cart)
    //     this.saveFile()
    //     return cart
        
    // }

    // addProduct(cId, pId){
    //         const cart = this.carts.find(c => c.id == cId)
    //         let cartProduct = cart.products.find(p => p.id == pId)
    //         if (cartProduct){
    //             cartProduct.quantity ++
    //         } else {
    //             cart.products.push({id: parseInt(pId), quantity:1})
    //         }
    //         this.saveFile()
    // }
}
