"use strict";

const express = require("express");
const router = express.Router();

const { Post } = require("../models/index");

router.get("/post", getPost);
router.post("/post", createPost);
router.delete("/post/:id", deletePost);
router.get("/post/:id", getOnePost);
router.put("/post/:id", updatePost);

async function getPost(req, res) {
  let post = await Post.findAll();
  res.status(201).json({
    post,
  });
}

async function getOnePost(req, res) {
  const id = req.params.id;

  let getOnePost = await Post.findOne({
    where: { id: id },
  });
  res.status(200).json({ getOnePost });
}

async function createPost(req, res) {
  let newPost = req.body;
  let post = await Post.create(newPost);
  res.status(201).json(post);
}

async function deletePost(req, res) {
  const id = req.params.id;
  let deletedPost = await Post.destroy({
    where: { id: id },
  });
  res.status(204).json({ deletedPost });
}

async function updatePost(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const post = await Post.findOne({
    where: { id: id },
  });

  const updatePost = await post.update(obj);
  res.status(200).json(updatePost);
}

module.exports = router;
