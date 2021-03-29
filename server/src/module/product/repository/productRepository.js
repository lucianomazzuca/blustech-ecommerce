const Product = require("../entity/Product");
const ProductIdNotDefinedError = require("../error/ProductIdNotDefinedError");
const ProductNotDefinedError = require("../error/ProductNotDefinedError");
const ProductNotFoundError = require("../error/ProductNotFoundError");
const { fromModelToEntity } = require("../mapper/productMapper");

class ProductRepository {
  constructor({ productModel, categoryModel, brandModel }) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
    this.brandModel = brandModel;
  }

  async getAll(offset = 0, limit = 10, terms) {
    
    
    const result = await this.productModel.findAndCountAll({
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
      offset,
      limit
    });

    const data = {
      count: result.count,
      products: result.rows.map((product) => fromModelToEntity(product))
    }
    
    return data
  }

  async getById(id) {
    if (!Number(id)) {
      throw new ProductIdNotDefinedError();
    };
    
    const product = await this.productModel.findByPk(id, {
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
    });
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${id} was not found`);
    };

    return fromModelToEntity(product);
  }

  async save(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    }
    
    const newProduct = this.productModel.build(product, {
      isNewRecord: !product.id,
    });
    await newProduct.save();

    return fromModelToEntity(newProduct);
  }

  async delete(product) {
    if (!(product instanceof Product)) {
      throw new ProductNotDefinedError();
    };

    return Boolean(await this.productModel.destroy({ where: { id: product.id }}))
  };
};

module.exports = ProductRepository;
