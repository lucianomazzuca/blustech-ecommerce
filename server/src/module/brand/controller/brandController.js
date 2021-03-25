const { fromFormToEntity } = require('../mapper/brandMapper');
const { validationResult } = require("express-validator");

class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }

  async index(req, res) {
    const brands = await this.brandService.getAll();
    return res.json(brands);
  }

  async save(req, res, next) {
    if (req.user.isAdmin === false) {
      res.sendStatus(403)
    }

    try {
      const brand = fromFormToEntity(req.body);
      await this.brandService.save(brand);
      res.status(201);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;