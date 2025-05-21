# E-commerce Backend API

This is the backend API for an e-commerce product and review system built with Express, TypeScript, and MongoDB.

## Setup

1. Create a `.env` file in the server root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production build:
   ```
   npm run build
   npm start
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products (paginated, 10 per page)
- `GET /api/products?page=1&category=electronics` - Filter products by category
- `GET /api/products/search?q=keyword` - Search products by name
- `GET /api/products/:id` - Get a single product

### Reviews
- `GET /api/products/:id/reviews` - Get all reviews for a product
- `POST /api/products/:id/reviews` - Add a review to a product
- `PUT /api/products/:productId/reviews/:id` - Update a review
- `DELETE /api/products/:productId/reviews/:id` - Delete a review

## Data Models

### Product
- id
- name
- description
- category
- price
- dateAdded
- averageRating (computed from reviews)

### Review
- id
- productId
- author
- rating (1–5)
- comment
- date # wap_project
