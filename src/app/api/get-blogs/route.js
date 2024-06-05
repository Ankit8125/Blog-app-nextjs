import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await connectToDB() // we connect to database first
        // since we dont have any users, so we can get all the blogs and display it
        const extractAllBlogsFromDatabase = await Blog.find({}) // gets a list of documents that match filter

        if(extractAllBlogsFromDatabase){
            return NextResponse.json({
                success: true,
                data: extractAllBlogsFromDatabase // need to pass the data back!
            })
        } 
        else{
            return NextResponse.json({
                success: false,
                message: "Something went wrong in getting blogs! Please try again later"
            })
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong in getting blogs! Please try again later"
        })
    }
}