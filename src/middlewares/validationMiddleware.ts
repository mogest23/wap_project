import { body } from 'express-validator';

// Review validation middleware
export const validateReview = [
    body('author')
        .notEmpty()
        .withMessage('Author name is required')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Author name must be between 2 and 100 characters'),

    body('rating')
        .notEmpty()
        .withMessage('Rating is required')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),

    body('comment')
        .notEmpty()
        .withMessage('Comment is required')
        .trim()
        .isLength({ min: 5, max: 1000 })
        .withMessage('Comment must be between 5 and 1000 characters'),
];

// Product ID validation
export const validateMongoId = (idName: string) => [
    body(idName)
        .notEmpty()
        .withMessage(`${idName} is required`)
        .isMongoId()
        .withMessage(`${idName} must be a valid MongoDB ID`),
]; 