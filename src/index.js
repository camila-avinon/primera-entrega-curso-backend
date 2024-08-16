// Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

//  - La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
//     - Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
//     - products: Array que contendrá objetos que representen cada producto
//  - La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
//  - La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
//     - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
//     - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.

// Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto. 

// La persistencia de la información se implementará utilizando el file system, donde los archivos “productos,json” y “carrito.json”, respaldan la información.

// Formato:
//  - Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.

// Sugerencias:
//  - No olvides app.use(express.json())
//  - No es necesario implementar multer
//  - Link al video donde se explica.

import express from 'express'
import productRoutes from './routes/product-routes.js'
import cartRoutes from './routes/cart-routes.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 8080

// Routers
app.use('/api/products', productRoutes)
app.use('/api/pet', cartRoutes)


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))