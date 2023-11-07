class UserTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserTypeError";
    this.statusCode = 400;
    this.message = "O usuário não é um professor.";
  }
}

module.exports = UserTypeError;
