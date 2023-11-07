class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 409;
    this.message = "usuário não encontrado.";
  }
}

module.exports = UserNotFoundError;
