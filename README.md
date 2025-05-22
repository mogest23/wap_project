# Product Review Server

The backend API for the Product Review system, built with Node.js, Express, and TypeScript.

## Tech Stack

- Node.js with Express
- TypeScript
- MongoDB for database
- Mongoose for ODM
- Swagger for API documentation

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

### Environment Setup

Create a `.env` file in the server directory:
```env
# For development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/product-review
NODE_ENV=development

# For production (Render)
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
NODE_ENV=production
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The API will be available at:
- Development: [http://localhost:3000/api](http://localhost:3000/api)
- Production: [https://product-review-api.onrender.com/api](https://product-review-api.onrender.com/api)

API documentation will be available at:
- Development: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Production: [https://product-review-api.onrender.com/api-docs](https://product-review-api.onrender.com/api-docs)

## Project Structure

```
server/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middlewares/   # Custom middlewares
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── scripts/       # Utility scripts
│   └── index.ts       # Application entry point
├── swagger.yaml       # API documentation
└── tsconfig.json      # TypeScript configuration
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID

### Reviews
- `GET /api/products/:productId/reviews` - Get product reviews
- `POST /api/products/:productId/reviews` - Add a review
- `PUT /api/products/:productId/reviews/:id` - Update a review
- `DELETE /api/products/:productId/reviews/:id` - Delete a review

For detailed API documentation, visit [https://product-review-api.onrender.com/api-docs](https://product-review-api.onrender.com/api-docs)

## Database Schema

### Product
```typescript
{
  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}
```

### Review
```typescript
{
  id: string
  productId: string
  rating: number (1-5)
  comment: string
  createdAt: Date
  updatedAt: Date
}
```

## Development

### Code Style
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Testing
```bash
npm test
```

### Building for Production
```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

The server is deployed on Render:
- URL: [https://product-review-api.onrender.com](https://product-review-api.onrender.com)
- Platform: Render
- Database: MongoDB Atlas
- Environment Variables: Configured in Render dashboard

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
