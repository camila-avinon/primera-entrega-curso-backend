import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'productos'

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    code: {type: String,
        unique: true,
        required: true
    },
    stock: Number,
    category: String,
    status: {type: Boolean,
        default: true        
    },
    thumbnail: String
}, {versionKey: false})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)
export default productModel