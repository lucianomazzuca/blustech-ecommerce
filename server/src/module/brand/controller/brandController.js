const { fromFormToEntity } = require('../mapper/brandMapper');

class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }

  async index(req, res, next) {
    try{
      let page = req.query.page;
      if (isNaN(page) || page < 1) {
        page = 1;
      };

      const limit = 15;
      const offset = (page - 1) * limit;
      
      const data = await this.brandService.getAll(offset, limit);
      return res.status(200).json(data);

    } catch (err) {
      next(err);
    }
  }

  async save(req, res, next) {
    if (req.user.isAdmin === false) {
      res.sendStatus(403)
    }

    try {
      const brand = fromFormToEntity(req.body);
      await this.brandService.save(brand);
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
      const brand = fromFormToEntity(req.body);
      brand.id = req.params.id
      await this.brandService.save(brand);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res) {
    try {
      const brand = await this.brandService.getById(req.params.id);
      return res.status(200).json({brand});
    } catch(err) {
    console.log(err)
    }
  }

  async delete(req, res, next) {
    try {
      const brand = await this.brandService.getById(req.params.id);
      await this.brandService.delete(brand);
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BrandController;