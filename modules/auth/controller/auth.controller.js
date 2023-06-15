import bcrypt from 'bcryptjs'
import userModel from '../../../DB/models/User.model.js'
import { signInSchema, signUpSchema } from '../auth.validation.js'
import jwt from "jsonwebtoken"
export const signUp=async(req,res)=>{
    const {name,email,password,cPassword}= req.body
    const validtor=signUpSchema.validate({name,email,password,cPassword},{abortEarly:false})
    let{value,error}=validtor
    let isValid=error==null
    if(!isValid){

        return res.json({message:"validtion error",error})
    }else{
        let user=await userModel.findOne({email})
if(user){
    return res.json({message:"email exists"})
}
        let hashPass= bcrypt.hashSync(password,parseInt(process.env.SRound))
        let newUser=await userModel.create({name,email,password:hashPass})
        return res.json({message:"validtion success",newUser})

    }
}
export const signIn=async(req,res)=>{
const {email,password}=req.body
let vlaidtor =signInSchema.validate(req.body,{abortEarly:false})
let{value,error}=vlaidtor
let isValid=error==null
if(!isValid){

    return res.json({message:"validtion error",error})
}
const user =await userModel.findOne({email})
if(!user){
    return res.json({message:"invalid account",user})

}
else{
    const isMatch =bcrypt.compareSync(password,user.password)
    if(!isMatch){
        return res.json({message:"incorrect email or passwrod"})

    }
    else{
        const token =jwt.sign({id:user._id},process.env.SECRET,{expiresIn:"7d"})
        return res.json({message:"success",token})

    }
}
}