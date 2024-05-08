const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    let total = 0;
    blogList.forEach(blog => {
        total += blog.likes
    });

    return total

}

const favoriteBlog = (blogList) => {
    if (blogList.length === 0) {
        return null
    }

    let blogFav = blogList[0]

    console.log(`Blog favorito hasta el momento ${blogFav.title}`);

    blogList.forEach(blog => {
        if (blog.likes >= blogFav.likes) {
            blogFav = blog
        }


    });
    return {
        title: blogFav.title,
        author: blogFav.author,
        likes: blogFav.likes,
    }

}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}