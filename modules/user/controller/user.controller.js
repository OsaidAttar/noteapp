import userModel from "../../../DB/models/User.model.js"
import { changePassSchema, updateSchema } from "../user.validation.js";
import bycrypt from "bcryptjs"

export const getUser=async(req,res)=>{
   
  let user=await userModel.findById(req.id)
    if(!user){
        return res.status(400).json({message:"user is not found"})
    }
    const newuser=await userModel.findById(req.id).select(['-_id','name','email'])
    return res.status(200).json({message:"modules user",newuser})
}



export const deleteUser=async(req,res)=>{
   let user=  await userModel.findByIdAndDelete(req.id)
     if(!user){
        return res.status(400).json({message:"user is not found"})
    }
    return res.status(200).json({message:"delete success"})
}
export const updateUser=async(req,res)=>{
let {email,name}=req.body
let validator= updateSchema.validate(req.body)
let{value,err}=validator
let isValid= err ==null
if(!isValid){
    return res.json({message:"validation error",err})
}
let user=await userModel.findById(req.id)
if(!user){
    return res.status(400).json({message:"user is not found"})
}
let newuser= await userModel.findByIdAndUpdate(req.id,{name,email},{new:true})
return res.json({message:"update success",newuser})
}





export const changePassword=async(req,res)=>{
let{currentPassword,newPassword}=req.body
let validator= changePassSchema.validate(req.body)

// let{value,err}=validator
// let isValid= (err==null)
let { error} = validator
let isValid= (error==null)
if(!isValid){
    return res.json({message:"validation error",error})
}
if(currentPassword==newPassword){
    return res.status(401).json({message:"current password is equal to new password"})
}
let user=await userModel.findById(req.id)
if(!user){
    return res.status(400).json({message:"user is not found"})
}else{
    let isMatch=await bycrypt.compare(currentPassword,user.password)
    if(!isMatch){
        return res.status(400).json({message:"invalid current password"})
    }else{
        const saltRound=process.env.SRound;
        let newHach =bycrypt.hashSync(newPassword,parseInt(saltRound))
        await userModel.updateOne({_id:user.id},{$set:{password:newHach}})
        return res.status(200).json({message:"password updated successfully"})
    }
}
}