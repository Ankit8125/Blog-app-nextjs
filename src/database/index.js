import mongoose from "mongoose";

const connectToDB = async() => {
    const connectionUrl = "mongodb+srv://syncing284:tqHkg4VJ3bTEMjSp@cluster0.xayvsug.mongodb.net/"
    
    mongoose
    .connect(connectionUrl)
    .then(() => console.log('Blog Database Connection is successfull.'))
    .catch((error) => console.log("Error occured in connecting database", error))
}

export default connectToDB;