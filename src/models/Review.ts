import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    productId: mongoose.Types.ObjectId;
    author: string;
    rating: number;
    comment: string;
    date: Date;
}

const ReviewSchema: Schema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        author: { type: String, required: true },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now }
    },
    {
        timestamps: true
    }
);

// Index to improve query performance
ReviewSchema.index({ productId: 1 });

export default mongoose.model<IReview>('Review', ReviewSchema); 