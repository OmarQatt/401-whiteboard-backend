"use strict";

const supertest = require("supertest");
const server = require("../server");
const request = supertest(server.app);


describe("get all post", () => {
  it("should get all post", async () => {
    const post = await request.post("/post");
    expect(post.status).toBe(201);
  });
});

describe("get specific post", () => {
    it("should get one post", async () => {
      const id = 1;
      const post = await request.get(`/post/${id}`);
      expect(post.status).toBe(200);
    });
  });

describe("create a post", () => {
  it("should create a post", async () => {
    const post = await request.post("/post").send({
      post: "asdsad",
      postStatus: true,
    });
    expect(post.status).toBe(201);
  });
});
describe("updated specific post", () => {
  it("should update a post", async () => {
    const id = 4;
    const response = await request.put(`/post/${id}`).send({
      post: "omar",
      postStatus: false
    });
    expect(response.status).toBe(200);
   
  });
});

describe("delete specific post", () => {
  it("should delete one post", async () => {
    const id = 1;
    const post = await request.delete(`/post/${id}`);
    expect(post.status).toBe(204);
  });
});

