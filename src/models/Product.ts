import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    category: string;
    price: number;
    image: string;
    dateAdded: Date;
    averageRating: number;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true, index: true },
        description: { type: String, required: true },
        category: { type: String, required: true, index: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        dateAdded: { type: Date, default: Date.now },
        averageRating: { type: Number, default: 0 }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for reviews
ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId'
});

export default mongoose.model<IProduct>('Product', ProductSchema); 