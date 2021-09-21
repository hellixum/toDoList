const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${con.connection.host}`); 
    }catch(err){
        console.log("Error connection to mongo server following is the Error");
        console.log(err); 
        process.exit(1); 
    }
}


module.exports = connectDB; 