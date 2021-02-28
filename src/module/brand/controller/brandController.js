const { fromFormToEntity } = require('../mapper/brandMapper');

class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }

  async index(req, res) {
    const brands = await this.brandService.getAll();
    return res.json(brands);
  }

  async save(req, res) {
    const brand = fromFormToEntity(req.body);
    await this.brandService.save(brand);
    res.redirect('/brands');
  }
}

module.exports = BrandController;