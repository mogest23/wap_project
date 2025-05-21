import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product';
import Review from '../models/Review';

// @desc    Get all products with pagination and optional category filter
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Build query
        const query: any = {};

        // Filter by category if provided
        if (req.query.category) {
            query.category = req.query.category;
        }

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort({ dateAdded: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            products,
            page,
            pages: Math.ceil(totalProducts / limit),
            totalProducts
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// @desc    Search products by name
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.q as string;

        if (!query) {
            res.status(400).json({ message: 'Search query is required' });
            return;
        }

        const products = await Product.find({
            name: { $regex: query, $options: 'i' }
        }).sort({ dateAdded: -1 });

        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// @desc    Get a single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('reviews');

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, category, price } = req.body;

        const product = await Product.create({
            name,
            description,
            category,
            price
        });

        res.status(201).json(product);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}; 