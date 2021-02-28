class BrandController {
  constructor({ brandService }) {
    this.brandService = brandService;
  }

  async index(req, res) {
    const brands = await this.brandService.getAll();
    return res.json(brands);
  }
}

module.exports = BrandController;