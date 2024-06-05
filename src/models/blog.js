import mongoose from "mongoose";

// so far we have created - database, model
// now we have to create api routes - CRUD

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema)

// 'mongoose.models.Blog' is very important to add here. 
// Issue: I was adding another data when my project was running, so in console, error: Can't add data once I have compiled was coming.
// Solution {chatgpt}
// In a typical development workflow, Next.js will hot-reload your code, which means it recompiles and refreshes the modules when you make changes. This can cause issues with how Mongoose models are registered.
// In your case, the error you are seeing likely occurs because Mongoose is trying to redefine the Blog model every time the file is recompiled, which is not allowed. Mongoose models should only be defined once, and attempting to redefine a model will throw an error.
// To solve this problem, you need to check if the model is already defined before defining it again. This can be done using mongoose.models.

export default Blog