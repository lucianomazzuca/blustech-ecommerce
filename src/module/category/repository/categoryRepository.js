

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