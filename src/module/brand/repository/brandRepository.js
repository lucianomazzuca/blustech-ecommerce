class BrandRepository {
  constructor({ brandModel }) {
    this.brandModel = brandModel;
  }

  getAll() {
    return this.brandModel.findAll();
  }
}

module.exports = BrandRepository