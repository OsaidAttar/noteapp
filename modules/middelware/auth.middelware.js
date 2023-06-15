import jwt from "jsonwebtoken"
export  const auth =async(req,res,next)=>{
const {authorization} =req.headers
if(!authorization){
    return res.json({message:"invalide token"})
}else{
    if(authorization.startsWith(process.env.BEARAR)){

        let token =authorization.split(process.env.BEARAR)[1]
    let decoded = jwt.verify(token,process.env.SECRET)
    req.id=decoded.id
    next()
     
    }else{
        return res.json({message:"invalide token"})
    }

}

}
