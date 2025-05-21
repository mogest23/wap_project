import express from 'express';
import {
    getProducts,
    getProductById,
    searchProducts,
    createProduct
} from '../controllers/productController';

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
router.post('/', createProduct);

// @route   GET /api/products
// @desc    Get all products
router.get('/', getProducts);

// @route   GET /api/products/search
// @desc    Search products by name
router.get('/search', searchProducts);

// @route   GET /api/products/:id
// @desc    Get a single product
router.get('/:id', getProductById);

export default router; 