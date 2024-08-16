import fs from 'fs/promises'
import path from 'path'

class ProductManager {
    constructor() {
        this.filePath = path.join('./', 'productos.json')
    }

    // Crear producto
    async createProduct(product){
        try {
            let products = []
            try {
                const data = await fs.readFile(this.filePath)
                products = JSON.parse(data)
                const newId = Math.floor(Math.random() * 1000 + 1)
                product.id = newId + products.length
                product.status = true
                products.push(product)
            }catch(e){
                console.error(`Error al leer el archivo: ${e}`)
            }

            // Escribir archivo
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf-8')
            return product
        } catch (e) {
            console.error(`Error al crear producto: ${e}`)
        }
    }

    // Llamar todos los productos
    async readProducts(){
        try {
            const data = await fs.readFile(this.filePath, 'utf-8')
            const products = JSON.parse(data)
            return products
        } catch (e) {
            console.error(`Error al buscar los productos: ${e}`)
        }
    }

    //Llamar un producto por Id
    async readProduct(pId){
        try {
            const data = await fs.readFile(this.filePath, 'utf-8')
            const products = JSON.parse(data)
            const product = products.find(p => p.id === parseInt(pId))
            return product
        } catch (e) {
            console.error(`Error al buscar el producto: ${e}`)
        }
    }

    // Actualizar producto
    async updateProduct(pId, productData){
        const data = await fs.readFile(this.filePath, 'utf-8')
        const products = JSON.parse(data)
        const productPosition = products.findIndex((p => p.id == pId))
        console.log(productPosition)
        if (productPosition > 0) {
            products[productPosition] = productData
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf-8')
            return products[productPosition]
        }
    }

    async deleteProduct(pId){
        const data = await fs.readFile(this.filePath, 'utf-8')
        const products = JSON.parse(data)
        const productSize = products.length
        const productPosition = products.findIndex((p => p.id == pId))
        if (productPosition > 0){
            products.splice(productPosition, 1)     
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2), 'utf-8')
            return (products.length, productSize)
        }
    }
}

export default ProductManager