class BrandRepository {
  constructor({ brandModel }) {
    this.brandModel = brandModel;
  }

  getAll() {
    return this.brandModel.findAll();
  }

  save(brand) {
    return this.brandModel.create(brand);
  }
}

module.exports = BrandRepository