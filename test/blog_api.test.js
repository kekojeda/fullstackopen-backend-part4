const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

// test('notes are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

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

test("blog can be added ", async () => {
  const newBlog = {
    title: "Prueba blog",
    author: "keko author",
    url: "direccionweb.com",
    likes: 16,
  };

  const cantBlogsBefore = (await api.get("/api/blogs")).body.length;

  console.log(`cantidad de blogs antes de agregar -> ${cantBlogsBefore}`);

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, cantBlogsBefore + 1);
  console.log(
    `cantidad de blogs antes de agregar -> ${cantBlogsBefore} y cantidad actual ${response.body.length}`
  );

  assert(titles.includes("Prueba blog"));
});

test.only("blog without likes is equals to 0  ", async () => {
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

// test('the first note is about HTTP methods', async () => {
//     const response = await api.get('/api/notes')

//     const contents = response.body.map(e => e.content)
//     assert.strictEqual(contents.includes('HTML is easy'), true)
//   })

after(async () => {
  await mongoose.connection.close();
});
