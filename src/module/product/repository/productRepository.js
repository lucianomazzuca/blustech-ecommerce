const Product = require('../entity/Product');
const ProductNotDefinedError = require('../error/ProductNotDefinedError');
const ProductNotFoundError = require('../error/ProductNotFoundError');
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

  async getById(id) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${id} was not found`);
    }

    return fromModelToEntity(product);
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }

    const newProduct = await this.productModel.create(product);

    return fromModelToEntity(newProduct);
  }

  async delete(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }
    return this.productModel.destroy({ where: {id: product.id}})
  }

}

module.exports = ProductRepository;
