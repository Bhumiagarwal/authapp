import { error } from 'console'
import mongoose from 'mongoose'


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection 
        connection.on('connected' , ()=>{
            console.log("mongoDb connected successfully",mongoose.connection.name)
        })
        connection.on('errors',(error)=>{
            console.log(error)
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong!")
        console.log(error)
    }
}