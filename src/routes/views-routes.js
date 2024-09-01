import express from 'express'
import ProductManager from '../services/ProductManager.js'
import { Server } from 'socket.io'

const router = express.Router()
const manager = new ProductManager()
const PORT = 8080

router.get('/realTimeProducts', (req, res) => {
    const products = manager.readProducts()
    res.render('realTimeProducts', {products})
})

router.get('/home', (req, res) => {
    const products = manager.readProducts()
    res.render('home', {products})
})

export default router