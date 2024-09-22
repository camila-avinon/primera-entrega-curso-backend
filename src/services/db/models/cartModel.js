import mongoose from "mongoose"

const cartCollection = 'carrito'

const cartSchema = mongoose.Schema({
    products:{
        type:[
            {
                _id: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'productos'
                },
                quantity: Number
            }
        ]
    }
}, {versionKey: false})

export const cartModel = mongoose.model(cartCollection, cartSchema)