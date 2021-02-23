const Product = require('../entity/Product');
const ProductNotDefinedError = require('../error/ProductNotDefinedError')
const { fromModelToEntity } = require('../mapper/productMapper');

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
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }

    const newProduct = await this.productModel.create(product);

    return fromModelToEntity(newProduct);
  }

}

module.exports = ProductRepository;
