'use client'

import { useEffect, useState } from "react"
import AddNewBlog from "../add-new-blog"
import { extend } from "joi"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Label } from "../ui/label"

const initialBlogFormData = {
    title: "",
    description: ""
}

// Here we need to manage form and everything so we need to use 'useState'
function BlogOverview({blogList}) {

    const [openBlogDialog, setOpenBlogDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
    const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null)

    // now when updating our data on frontend, I am not getting the upadted UI, so I am using this method
    const router = useRouter()

    useEffect(()=>{
        router.refresh() // effectively re-fetches the data and updates the UI.
    }, [])

    console.log(blogFormData);

    async function handleSaveBlogData(){
        try {
            setLoading(true)
            const apiResponse = 
            currentEditedBlogID !== null ?
            await fetch(`/api/update-blog?id=${currentEditedBlogID}`, { // doing this because on clicking 'Save changes', we must edit it and not create a new blog with the edited version. So to ensure proper working, we are doing it this way.
                method: 'PUT',
                body: JSON.stringify(blogFormData)
            })
            : await fetch('/api/add-blog', {
                method: 'POST',
                body: JSON.stringify(blogFormData) // converts a JavaScript value (such as an object or an array) into a JSON string
            })
            const result = await apiResponse.json()

            if(result?.success){
                setBlogFormData(initialBlogFormData)
                setOpenBlogDialog(false)
                setLoading(false)
                setCurrentEditedBlogID(null)
                router.refresh()
            }

            console.log(result);
        } catch (error) {
            console.log(error);
            setLoading(false)
            setBlogFormData(initialBlogFormData)
        }
    }

    async function handleDeleteBlogByID(getCurrentID){
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
                method: 'DELETE'
            })
            const result = await apiResponse.json()

            if(result?.success){
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleEdit(getCurrentBlog){
        // when I click on 'Edit' button, I will store the blog's id somewhere in a state and also I need to open the dialog with prepopulated value of this id.
        setCurrentEditedBlogID(getCurrentBlog?._id)
        setBlogFormData({
            title: getCurrentBlog?.title,
            description: getCurrentBlog?.description
        })
        setOpenBlogDialog(true)
    }

    return ( // just to make our code look cleaner, we have written shifted our AddNewBlog code to another folder in components and have imported it here.
        <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
            <AddNewBlog 
            openBlogDialog={openBlogDialog} 
            setOpenBlogDialog={setOpenBlogDialog}
            loading = {loading}
            setLoading = {setLoading}
            blogFormData = {blogFormData}
            setBlogFormData = {setBlogFormData}
            handleSaveBlogData={handleSaveBlogData}
            currentEditedBlogID={currentEditedBlogID}
            setCurrentEditedBlogID={setCurrentEditedBlogID}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    blogList && blogList.length>0 ?
                    blogList.map((blogItem) => 
                    <Card className="p-5">
                        <CardContent>
                            <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                            <CardDescription>{blogItem?.description}</CardDescription>
                            <div className="mt-5 flex gap-5 items-center">
                                <Button onClick={() => handleEdit(blogItem)}>Edit</Button> 
                                {/* Passing only blog item ABOVE, so that we can get all info. Check its function  */}
                                <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>Delete</Button>
                            </div>
                        </CardContent>
                    </Card>
                    )
                    : <Label className="text-3xl font-extrabold">No Blog found! Please add one</Label>
                }
            </div>
        </div>
    )
}

export default BlogOverview