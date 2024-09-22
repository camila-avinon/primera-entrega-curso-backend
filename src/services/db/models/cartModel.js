import mongoose from "mongoose"

const cartCollection = 'cart'

const cartSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',  // Ref a la colección "products"
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, { versionKey: false });

export const cartModel = mongoose.model(cartCollection, cartSchema)