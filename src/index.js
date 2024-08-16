import express from 'express'
import productRoutes from './routes/product-routes.js'
import cartRoutes from './routes/cart-routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 8080

// Routers
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))