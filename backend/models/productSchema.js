const mongoose = require("mongoose");

const producSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please enter product description"],
        },
        price: {
            type: Number,
            required: [true, "Please enter product price"],
        },
        category: {
            type: String,
            required: [true, "Please enter product category"],
        },
        brand: {
            type: String,
            required: [true, "Please enter product brand"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter product stock"],
            min: [0, "Stock cannot be less than 0"],
            default: 0,
        },
        images: [
            {
                url: {
                    type: String,
                    required: [true, "Please enter image URL"],
                },
                publicId: {
                    type: String,
                },
            },
        ],
        ratings: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                name: String,
                rating: Number,
                comment: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", producSchema);

module.exports = Product;
