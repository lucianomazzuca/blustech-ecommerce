class ProductRepository {
  constructor({ productModel, categoryModel, brandModel }) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
    this.brandModel = brandModel;
  }

  async getAll() {
    const products = await this.productModel.findAll({
      include: [
        { model: this.categoryModel, as: 'category' },
        { model: this.brandModel, as: 'brand'}
      ],
    });
    return products;
  }

  async getOne(id) {
    const product = await this.productModel.findByPk(id);

    return product;
  }

  async save(product) {

  }

}

module.exports = ProductRepository;
