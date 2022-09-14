"use strict";

const express = require("express");
const router = express.Router();

const { Comment } = require("../models/index");

router.get("/comment", getComment);
router.post("/comment", createComment);
router.delete("/comment/:id", deleteComment);
router.get("/comment/:id", getOneComment);
router.put("/comment/:id", updateComment);

async function getComment(req, res) {
  let comment = await Comment.read();
  res.status(200).json({
    comment,
  });
}

async function getOneComment(req, res) {
  const id = req.params.id;
  console.log(id)
  let getOneComment = await Comment.read(id);
  res.status(200).json({ getOneComment });
}

async function createComment(req, res) {
  let newComment = req.body;
  let comment = await Comment.create(newComment);
  res.status(201).json(comment);
}

async function deleteComment(req, res) {
  const id = req.params.id;
  let deletedComment = await Comment.delete(id);
  res.status(204).json({ deletedComment });
}

async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;
  const updatedComment = await Comment.update(id,obj);
  res.status(202).json(updatedComment);
}

module.exports = router;
