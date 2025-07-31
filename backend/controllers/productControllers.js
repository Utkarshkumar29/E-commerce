const Products=require('../models/productSchema')

const getProducts=async(req,res)=>{
    try {
        const products=await Products.find()
        res.status(201).json({message:products.length>0 ? "Products fetched" : "No products found",products})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error",
            error: error.message,
        })
    }
}

const getProductsById=async(req,res)=>{
    const { id } = req.params
    try {
        const product=await Products.findById(id)
        if(!product){
            return res.status(404).json({message:"Product not found"})
        }
        console.log(product)
        res.status(200).json({message:"Product fetched",product})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error",
            error: error.message,
        })
    }
}

const createProduct=async(req,res)=>{
    const {name,description,price,category,brand,stock,images,ratings,numReviews,reviews}=req.body
    try {
        const Product=new Products({
            name,
            description,
            price,
            category,
            brand,
            stock,
            images,
        })
        await Product.save()
        res.status(201).json({
            message:"Product created successfully",
            Product,
        });
    } catch (error) {
        console.error("Error creating product:", error)
        res.status(500).json({
            message:"Internal Server Error",
            error: error.message,
        })
    }
}

module.exports={getProducts,getProductsById,createProduct}