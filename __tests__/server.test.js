"use strict";

const supertest = require("supertest");
const server = require("../server");
const request = supertest(server.app);

let id;
describe("create a post", () => {
  it("should create a post", async () => {
    const post = await request.post('/post').send({
      post: "Hello welcome to the third post!",
      postStatus: true,
    });
    expect(post.status).toBe(201);
   
  });
});
describe("get all post", () => {
  it("should get all post", async () => {
    const post = await request.get("/post");
    expect(post.status).toBe(200);
  });
});

describe("get specific post", () => {
    it("should get one post", async () => {
      const id = 1;
      const post = await request.get(`/post/${id}`);
      expect(post.status).toBe(200);
    });
  });


describe("updated specific post", () => {
  
  it("should update a post", async () => {
    const id = 1;
    const response = await request.put(`/post/${id}`).send({
      post: "omar",
      postStatus: true,
    });
    expect(response.status).toBe(202);
   
  });
});

describe("delete specific post", () => {
  it("should delete one post", async () => {
    const id = 279;
    const post = await request.delete(`/post/${id}`);
    expect(post.status).toBe(204);
  });
});

describe("create a comment", () => {
  it("should create a comment", async () => {
    const comment = await request.post("/comment").send({
      comment: "first comment",
      commentStatus: true,
    });
    expect(comment.status).toBe(201);
   
  });
});
describe("get all comment", () => {
  it("should get all comment", async () => {
    const comment = await request.get("/comment");
    expect(comment.status).toBe(200);
  });
});

describe("get specific comment", () => {
    it("should get one comment", async () => {
      const id = 283;
      const comment = await request.get(`/comment/${id}`);
      expect(comment.status).toBe(200);
    });
  });


describe("updated specific comment", () => {
  
  it("should update a comment", async () => {
    const id = 280;
    const response = await request.put(`/comment/${id}`).send({
      comment: "omar",
      commentStatus: true,
    });
    expect(response.status).toBe(202);
   
  });
});

describe("delete specific comment", () => {
  it("should delete one comment", async () => {
    const id = 2;
    const comment = await request.delete(`/comment/${id}`);
    expect(comment.status).toBe(204);
  });
});


