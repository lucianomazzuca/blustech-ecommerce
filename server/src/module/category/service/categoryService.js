const Category = require('../entity/Category');
const CategoryIdNotDefinedError = require('../error/CategoryIdNotDefined');
const CategoryNotDefinedError = require('../error/CategoryNotDefinedError');

class CategoryService {
  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }

  async getAll(offset, limit, categoryName) {
    return this.categoryRepository.getAll(offset, limit, categoryName);
  }

  async save(category) {
    if (! (category instanceof Category)) {
      throw new CategoryNotDefinedError();
    }

    return this.categoryRepository.save(category);
  }

  async getById(id) {
    if (!Number(id)) {
      throw new CategoryIdNotDefinedError();
    }

    return this.categoryRepository.getById(id);
  }

  async delete(category) {
    if (! (category instanceof Category)) {
      throw new CategoryNotDefinedError();
    };

    return this.categoryRepository.delete(category);
  }
}

module.exports = CategoryService;