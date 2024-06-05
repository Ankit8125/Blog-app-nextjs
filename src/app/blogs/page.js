import BlogOverview from "@/components/blog-overview"

// this is a server component and here we are going to fetch the data

async function fetchListOfBlogs(){
    try {
        const apiResponse = await fetch('https://blog-app-nextjs-bdxpfmb43-ankit8125s-projects.vercel.app/api/get-blogs', { // here we need to pass exact url, else it will not work
            method: 'GET',
            cache: 'no-store'   
        }) 

        const result = await apiResponse.json()

        return result?.data // doing result.data as if blogs present then it will return 'success' and 'data: extractAllBlogsFromDatabase', refer 'get-blogs' for more info

    } catch (error) {
        throw new Error(error)
    }
}

async function Blogs(){

    const blogList = await fetchListOfBlogs()
    // console.log(blogList, 'bloglist'); // outputs blog which is present in database
    return (
        <BlogOverview blogList={blogList}/>
    )
}

export default Blogs