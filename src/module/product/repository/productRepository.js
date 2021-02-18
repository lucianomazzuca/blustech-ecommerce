class ProductRepository {
  constructor({productModel, categoryModel}) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  async getAll() {
    const products = await this.productModel.findAll({ include: { model: this.categoryModel }});
    return products;
  }
};

module.exports = ProductRepository;