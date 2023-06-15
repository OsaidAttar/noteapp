import userRouter from './user/user.router.js'
import authRouter from './auth/auth.router.js'
const initApp=(app,express)=>{
    app.use(express.json())
    app.get('/',(req,res)=>{
        res.send("hello..!")
    })
    app.use("/user",userRouter)
    app.use("/auth",authRouter)
    app.use('*',(req,res)=>{
        return res.json({message:"page not found"})
    })
   
}
export default initApp;