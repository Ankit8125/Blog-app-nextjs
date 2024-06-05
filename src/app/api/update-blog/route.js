import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
})


export async function PUT(req){
    try { // we take the PUT request
        await connectToDB() // connecting to database
        const {searchParams} = new URL(req.url)
        const getCurrentBlogID = searchParams.get('id') // getting current id

        if(!getCurrentBlogID){
            return NextResponse.json({
                success: false,
                message: 'Blog ID is required'
            })
        }

        const {title, description} = await req.json()

        const {error} = EditBlog.validate({ // Validates a value using the schema and options.
            title, description // checks if there are any error in the data
        })

        if(error){
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }
        
        const updateBlogByBlogID = await Blog.findByIdAndUpdate({ // updating
            _id: getCurrentBlogID
        }, {title, description}, {new: true}) // we want to update title and description
        //  { new: true } option specifies that the method should return the updated document rather than the original document.

        if(updateBlogByBlogID){
            return NextResponse.json({
                success: true,
                message: 'Blog is updated successfully'
            })
        }
        else {
            return NextResponse.json({
                success: false,
                message: 'Something went wrong! Please try again'
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong! Please try again'
        })
    }    
}