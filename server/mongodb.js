import mongoose from 'mongoose'

const connectdb = async() =>{
    try {
        await mongoose.connect('mongodb+srv://utkarshsharmabd:z3kD9MmkkTJGmF2c@cluster0.7t44k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectdb;