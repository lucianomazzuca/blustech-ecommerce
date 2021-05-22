const Product = require("../entity/Product");
const ProductIdNotDefinedError = require("../error/ProductIdNotDefinedError");
const ProductNotDefinedError = require("../error/ProductNotDefinedError");
const ProductNotFoundError = require("../error/ProductNotFoundError");
const { fromModelToEntity } = require("../mapper/productMapper");
const { Op } = require("sequelize");

class ProductRepository {
  constructor({ productModel, categoryModel, brandModel }) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
    this.brandModel = brandModel;
  }

  async getAll(offset = 0, limit = 10, term, category, brand, sort) {
    let query = {};
    let order;

    if (term) {
      // Filter by model, brand or category name
      query = {
        [Op.or]: [
          { model: { [Op.iLike]: "%" + term + "%" } },
          { "$category.name$": { [Op.iLike]: "%" + term + "%" } },
          { "$brand.name$": { [Op.iLike]: "%" + term + "%" } },
        ],
      };
    }

    if (category) {
      query["$category.id$"] = { [Op.eq]: category };
    }

    if (brand) {
      query["$brand.id$"] = { [Op.eq]: brand };
    }

    if (sort) {
      order: [[sort, "DESC"]];
    }

    const result = await this.productModel.findAndCountAll({
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
      offset,
      limit,
      order,
      where: query,
    });

    const data = {
      count: result.count,
      products: result.rows.map((product) => fromModelToEntity(product)),
    };

    return data;
  }

  async getById(id) {
    if (!Number(id)) {
      throw new ProductIdNotDefinedError();
    }

    const product = await this.productModel.findByPk(id, {
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
    });
    if (!product) {
      throw new ProductNotFoundError(`Product with id ${id} was not found`);
    }

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
    }

    return Boolean(
      await this.productModel.destroy({ where: { id: product.id } })
    );
  }

  async getMany(productsId) {
    const result = await this.productModel.findAll({
      where: {
        id: {
          [Op.in]: productsId,
        },
      },
      include: [
        { model: this.categoryModel, as: "category" },
        { model: this.brandModel, as: "brand" },
      ],
    });

    const productsMapped = result.map(product => fromModelToEntity(product));
    
    return productsMapped;
  }
}

module.exports = ProductRepository;
