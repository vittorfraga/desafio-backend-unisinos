class EmailAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailAlreadyExistsError";
    this.statusCode = 409;
    this.message = "O e-mail já está em uso.";
  }
}

module.exports = EmailAlreadyExistsError;
