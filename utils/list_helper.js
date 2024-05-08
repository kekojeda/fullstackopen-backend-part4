const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  let total = 0;
  blogList.forEach((blog) => {
    total += blog.likes;
  });

  return total;
};

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) {
    return null;
  }

  let blogFav = blogList[0];

  console.log(`Blog favorito hasta el momento ${blogFav.title}`);

  blogList.forEach((blog) => {
    if (blog.likes >= blogFav.likes) {
      blogFav = blog;
    }
  });
  return {
    title: blogFav.title,
    author: blogFav.author,
    likes: blogFav.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let authors = blogs.map((blog) => blog.author);

  const authorCounts = _.countBy(authors);

  let maxAuthor = "";
  let maxCount = "";

  for (const author in authorCounts) {
    if (authorCounts[author] > maxCount) {
      maxCount = authorCounts[author];
      maxAuthor = author;
    }
  }
  return {
    author: maxAuthor,
    blogs: maxCount,
  };
};

const mostLikes = (blogs) => {
   
    if (blogs.length === 0) {
      return null;
    }
    const likesByAuthor = {};

    blogs.forEach(blog => {
        if (blog.author in likesByAuthor) {
          likesByAuthor[blog.author] += blog.likes;
        } else {
          likesByAuthor[blog.author] = blog.likes;
        }
      });

      let authorWithMostLikes = '';
      let maxLikes = 0;
      for (const author in likesByAuthor) {
        if (likesByAuthor[author] > maxLikes) {
          maxLikes = likesByAuthor[author];
          authorWithMostLikes = author;
        }
      }
      return{
        author: authorWithMostLikes,
        likes: maxLikes
      };  

  
  };


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
