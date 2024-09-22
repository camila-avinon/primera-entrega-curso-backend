import mongoose from "mongoose"

const productCollection = 'productos'

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    code: {type: Number,
        unique: true,
        required: [true, 'El código es requerido']
    },
    stock: Number,
    category: String,
    status: {type: Boolean,
        default: true        
    },
    thumbnail: String
}, {versionKey: false})

export const productModel = mongoose.model(productCollection, productSchema)