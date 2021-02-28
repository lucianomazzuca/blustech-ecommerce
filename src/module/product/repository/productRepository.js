const Product = require("../entity/Product");
const ProductNotDefinedError = require("../error/ProductNotDefinedError");
const ProductNotFoundError = require("../error/ProductNotFoundError");
const { fromModelToEntity } = require("../mapper/productMapper");

class ProductRepository {
  constructor({ productModel, categoryModel, brandModel }) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
    this.brandModel = brandModel;
  }

  async getAll() {
    const products = await this.productModel.findAll({
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
    });

    return products.map((product) => fromModelToEntity(product));
  }

  async getById(id) {
    const product = await this.productModel.findByPk(id, {
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
    });
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${id} was not found`);
    }

    return fromModelToEntity(product)
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }
    
    try {
      const newProduct = await this.productModel.create(product);
      return fromModelToEntity(newProduct);
    } catch(e) {
      debugger
      console.log(e)
    }

  }

  async delete(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }
    return this.productModel.destroy({ where: { id: product.id } });
  }
}

module.exports = ProductRepository;
