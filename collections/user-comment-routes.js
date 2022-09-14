"use strict";

class userCommentRoutes {
  constructor(model) {
    this.model = model;
  }

  async create(obj) {
    try {
      return await this.model.create(obj);
    } catch (e) {
      console.error("Error creating  user comment route");
    }
  }

  async read(id) {
    try {
      if (id) {
        return await this.model.findOne({ where: { id: id } });
      } else {
        return await this.model.findAll();
      }
    } catch (e) {
      console.error(`Error with passing this id: ${id}`);
    }
  }

  async update(id, obj) {
    try {
      const dataById = await this.model.findOne({ where: { id: id } });
      return await dataById.update(obj);
    } catch (e) {
      console.error(`Error update id: ${id}`);
    }
  }

  async delete(id) {
    try {
        console.log(id)
      return await this.model.destroy({ where: { id: id } });
    } catch (e) {
      console.error(`Error while deleting the data with id : ${id}`);
    }
  }

  async readWithComment(Comment) {
    try {
      return await this.model.findAll({ include: [Comment] });
    } catch (e) {
      console.error(`Error while reading the comment for model: ${this.model.name}`);
    }
  }
}

module.exports = userCommentRoutes;
