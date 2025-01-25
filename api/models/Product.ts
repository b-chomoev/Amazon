import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        required: true,
    },
    image: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Seller is required'],
    }
});

export const Product = mongoose.model("Product", ProductSchema);