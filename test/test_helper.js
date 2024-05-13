const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    
    title: 'titulo de blog prueba',
    author: 'Sergio Ojeda',
    url: "wwww.author.com",
    likes: 15
  },
  {
    
    title: 'titulo de blog prueba2',
    author: 'Sergio Ojeda2',
    url: "wwww.author2.com",
    likes: 15
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}