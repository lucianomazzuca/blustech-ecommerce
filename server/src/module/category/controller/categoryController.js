const { fromFormToEntity } = require('../mapper/categoryMapper');

class CategoryController {
  constructor({ categoryService }) {
    this.categoryService = categoryService;
  }

  async index(req, res, next) {
    try{
      let page = req.query.page;
      let limit = req.query.limit;
      let categoryName = req.query.term;
      if (isNaN(page) || page < 1) {
        page = 1;
      };

      if (isNaN(limit) || page < 1) {
        limit = 15;
      };

      const offset = (page - 1) * limit;
      
      const data = await this.categoryService.getAll(offset, limit, categoryName);
      return res.status(200).json(data);

    } catch (err) {
      next(err);
    }
  }

  async save(req, res, next) {
    try {
      const category = fromFormToEntity(req.body);
      await this.categoryService.save(category);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async edit(req, res, next) {
    if (req.user.isAdmin === false) {
      res.sendStatus(403)
    }

    try {
      const category = fromFormToEntity(req.body);
      category.id = req.params.id
      await this.categoryService.save(category);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res) {
    try {
      const category = await this.categoryService.getById(req.params.id);
      return res.status(200).json({category});
    } catch(err) {
    console.log(err)
    }
  }

  async delete(req, res, next) {
    try {
      const category = await this.categoryService.getById(req.params.id);
      await this.categoryService.delete(category);
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;