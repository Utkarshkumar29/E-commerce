const User=require('../models/userSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=>{
    const { username,password,email,image }=req.body
    try {
        const hashPasswrod=await bcrypt.hash(password,10)
        const newUser=new User({
            username:username,
            password:hashPasswrod,
            email,
            image
        })
        await newUser.save()
        const token = jwt.sign({ email,username,id: newUser._id },'your_jwt_secret',{expiresIn:'1h'})
        res.status(201).json({ message:'User registered successfully',token})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Failed to register user'})
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(401).json({message:"Invalied Password."})
        }
        const token=jwt.sign({id: user._id, email: user.email},'your_jwt_secret',{expiresIn:"1h"})
        res.status(200).json({message:"Login Successfull",token,user:{
            id: user._id,
            username: user.username,
            email: user.email
        }})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Login failed"})
    }
}

module.exports={registerUser,loginUser}