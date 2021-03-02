const Category = require('../entity/Category');
const CategoryIdNotDefinedError = require('../error/CategoryIdNotDefined');
const CategoryNotFoundError = require('../error/CategoryNotFoundError');
const CategoryNotDefinedError = require('../error/CategoryNotDefinedError');
const { fromModelToEntity } = require('../mapper/categoryMapper');

class CategoryRepository {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  async save(category) {
    if (! (category instanceof Category)) {
      throw new CategoryNotDefinedError();
    };


  }
}