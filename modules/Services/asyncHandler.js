export let asyncHandler =(fn)=>{
    return (req,res)=>
    [
        fn(req,res).catch(err=>{
            return res.status(500).json({message:"catch error",error:err.stack})
        })
    ]
}