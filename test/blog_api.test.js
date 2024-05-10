const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);



describe('GET TEST', () => {
  test("there are two notes", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 2);
  });

  test("unique identifier is called id and not _id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    blogs.forEach((blog) => {
      assert.strictEqual(blog._id, undefined);
      assert.strictEqual(typeof blog.id, "string");
    });
  });


})

describe('POST TEST', () => {

  test("blog can be added ", async () => {
    const newBlog = {
      title: "Prueba blog",
      author: "keko author",
      url: "direccionweb.com",
      likes: 16,
    };
    const cantBlogsBefore = (await api.get("/api/blogs")).body.length;

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);

    assert.strictEqual(response.body.length, cantBlogsBefore + 1);


    assert(titles.includes("Prueba blog"));
  });

  test("blog without likes is equals to 0  ", async () => {
    const newBlog = {
      title: "Prueba blog sin likes",
      author: "keko author",
      url: "direccionweb.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const lastBlog = response.body[response.body.length - 1]

    assert.strictEqual(lastBlog.likes, 0);
  });
  test("blog without title or url property, receives 400 Bad Request error", async () => {
    const newBlog = {
      title: "Prueba blog sin autor",
      author: "keko author",
      //   url: "direccionweb.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)

  });

})

describe('DELETE TEST', () => {

  test.only('succeeds with status code 204 if id is valid', async () => {

    const response = await api.get("/api/blogs");
    const blogAtStart = response.body
    const blogToDelete = blogAtStart[0]

    
    // console.log(blogToDelete.id);

    await api
      .delete(`/api/notes/${blogToDelete.id}`)
      .expect(204)

     const blogAtEnd = await api.get("/api/blogs").body

     assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1)

    const titles = blogAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
  })
})



after(async () => {
  await mongoose.connection.close();
})
