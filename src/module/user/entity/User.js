class User {
  constructor({
    id,
    name,
    mail,
    password,
    isAdmin,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.isAdmin = isAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;