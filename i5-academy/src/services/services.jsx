export async function getAllBlog() {
    try{
        const response = await fetch('http://localhost:3000/api/blogs')
        if(response.ok){
            const data = response.json()
            return data
        }
    }catch{
        return ''
    }
}

export async function getBlogByClass(searchParams) {
    try{
        const response = await fetch(`http://localhost:3000/api/blogs/class?c=${searchParams.get('name')}`)
        if(response.ok){
            const result = await response.json()
            return result
        }
    }catch{
        return ''
    }
}