import express from 'express'
import orderModel from "../models/orderModel.js";
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware, placeOrder)

export default orderRouter
