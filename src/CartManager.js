import fs from 'fs/promises'
import path from 'path'

class CartManager {
    constructor() {
        this.filePath = path.join('./', 'Products.json')
    }


}

export default CartManager