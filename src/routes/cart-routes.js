import { Router } from "express"
import CartManager from "../CartManager.js"

const router = Router()
const manager = new CartManager()


export default router
