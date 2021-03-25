const { fromFormToEntity } = require('../mapper/brandMapper');

class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }

  async index(req, res) {
    try{
      let page = req.query.page;
      if (page < 1 || page == undefined) {
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
}

module.exports = BrandController;