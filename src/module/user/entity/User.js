class User {
  constructor({
    id,
    name,
    email,
    password,
    isAdmin,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;