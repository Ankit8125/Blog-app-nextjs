// POST api route as we are going to save data in database

import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

// making a new model
const AddNewBlog = Joi.object({ // this will help us validate
    title: Joi.string().required(), // mandatory field 
    description: Joi.string().required() // mandatory field
})


export async function POST(req){
    try {
        await connectToDB();

        const extractBlogData = await req.json();
        const {title, description} = extractBlogData;

        const {error} = AddNewBlog.validate({ // Validates a value using the schema and options.
            title, description
        })

        if(error){
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }

        const newlyCreatedBlogItem = await Blog.create(extractBlogData);
        if(newlyCreatedBlogItem){
            return NextResponse.json({
                success: true,
                message: 'Blog added successfully'
            })
        } 
        else{
            return NextResponse.json({ // This class extends the Web Response API with additional convenience methods.
                success: false,
                message: 'Something went wrong! Please try again'
            }) 
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ // This class extends the Web Response API with additional convenience methods.
            success: false,
            message: 'Something went wrong! Please try again'
        }) 
    }
}