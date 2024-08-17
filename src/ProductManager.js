import fs from 'fs/promises'
import path from 'path'

const filePath = path.resolve('data', 'productos.json')

export default class ProductManager {
    constructor() {
        this.products = []
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (e) {
            console.log(e)
            this.products = []
        }
    }

    saveFile(){
        fs.writeFile(filePath, JSON.stringify(this.products, null, 2))
    }

    // Crear producto
    createProduct(product){
        const newId = Math.floor(Math.random() * 1000 + 1)
        const newProduct = {
            id: newId,
            ...product,
            status: true
        }
        this.products.push(newProduct)
        this.saveFile()
        return newProduct
    }

    // Llamar todos los productos
    readProducts(){
        return this.products
    }

    //Llamar un producto por Id
    readProduct(pId){
        return this.products.find(p => p.id === pId)
    }

    // Actualizar producto
    updateProduct(pId, productData){
        productData.id = pId        
        const productPosition = this.products.findIndex((p => p.id === pId))
        if (productPosition >= 0) {
            this.products[productPosition] = productData
            this.saveFile()
            return this.products[productPosition]
        }
    }

    deleteProduct(pId){
        const productIndex = this.products.findIndex(p => p.id === pId)
        if (productIndex === -1) return null
        this.products.splice(productIndex, 1)
        this.saveFile()
    }
}