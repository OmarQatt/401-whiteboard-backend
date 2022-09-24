"use strict";

const express = require("express");
const router = express.Router();
const bearerCheck = require('../middlewares/bearerAuth');
const { Post, Comment, commentModel } = require("../models/index");

router.get("/post", getPost);
router.post("/post", createPost);
router.delete("/post/:id", deletePost);
router.get("/post/:id", getOnePost);
router.put("/post/:id", updatePost);
router.get("/getPostComment", getPostComment);

async function getPost(req, res) {
  let post = await Post.read();
  res.status(200).json({
    post,
  });
}

async function getOnePost(req, res) {
  const id = req.params.id;

  let getOnePost = await Post.read(id);
  res.status(200).json({ getOnePost });
}

async function createPost(req, res) {
  let newPost = req.body;
  let post = await Post.create(newPost);
  res.status(201).json(post);
}

async function deletePost(req, res) {
  const id = req.params.id;

  let deletedPost = await Post.delete(id);
  res.status(204).send("deleted ");
}

async function updatePost(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const updatedPost = await Post.update(id, obj);
  res.status(202).json(updatedPost);
}

async function getPostComment(req, res) {
  const postComment = await Post.readWithComment(commentModel);
  res.status(200).json(postComment);
}

module.exports = router;
