import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewRouter from './routes/views-routes.js'
import { Server } from 'socket.io'
import productRoutes from './routes/product-routes.js'
import cartRoutes from './routes/cart-routes.js'
import ProductManager from './services/ProductManager.js'

const app = express()


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views/')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080
const manager = new ProductManager()

// Routers
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)

app.use('/', viewRouter)


const httpServer = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

const socketServer = new Server(httpServer)
socketServer.on('connection', socket=>{
    console.log('Y la que conecte :*')
    let products = manager.readProducts() 
    socket.emit('products', products)
    socket.on('newProduct', newProduct=>{
        manager.createProduct(newProduct)
        products = manager.readProducts() 
        socket.emit('products', products)
    })
    socket.on('deleteProduct', id=>{
        id=parseInt(id)
        manager.deleteProduct(id)
        let products = manager.readProducts() 
        socket.emit('products', products)
    })    
})
