'use client'

import { Fragment } from "react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function AddNewBlog({
    openBlogDialog, 
    setOpenBlogDialog, 
    loading, 
    blogFormData, 
    setBlogFormData,
    handleSaveBlogData,
    currentEditedBlogID,
    setCurrentEditedBlogID
}){ 
    return (
        <Fragment> {/* When you return multiple elements from a component (e.g., in your AddNewBlog component), you typically need to wrap them in a single parent element (e.g., a <div>) */}
            <div>
                <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>
            <Dialog open={openBlogDialog} onOpenChange={() => {
                setOpenBlogDialog(false);
                setBlogFormData({
                    title: "",
                    description: ""
                })
                setCurrentEditedBlogID(null) // while closing. If this is not there then while clicking 'Add New Blog' I am getting 'Edit Blog' written at top in my dialog. So to change it, we are setting this as null
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedBlogID ? "Edit Blog" : "Add New Blog"}</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input
                                name="title"
                                placeholder="Enter blog title"
                                value={blogFormData.title}
                                onChange={(event) => {
                                    setBlogFormData({
                                        ...blogFormData, // spreading the existing blogFormData 
                                        title: event.target.value // and updates the title property with the new value from event.target.value
                                    })
                                }}
                                id="title"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                name="description"
                                value={blogFormData.description}
                                onChange={(event) => {
                                    setBlogFormData({
                                        ...blogFormData,
                                        description: event.target.value
                                    })
                                }}
                                id="description"
                                // defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveBlogData} type="button">
                            {loading ? "Saving changes" : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default AddNewBlog