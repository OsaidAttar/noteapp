import mongoose from "mongoose";
const connectDB=async()=>{
await mongoose.connect(process.env.DBURI)
.then(result=>{
    console.log("connect DB success")
}).catch(err=>{
    console.log("connecdt DB error",err);
})
}
export default connectDB