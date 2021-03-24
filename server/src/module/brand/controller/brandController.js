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
    console.log('authenticated')

    // const brand = fromFormToEntity(req.body);
    // await this.brandService.save(brand);


    res.status(201);
  }
}

module.exports = BrandController;