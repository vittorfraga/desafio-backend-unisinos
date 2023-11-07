class EmailOrPasswordIncorrectError extends Error {
  constructor() {
    super("Email or password incorrect");
    this.statusCode = 400;
  }
}

module.exports = EmailOrPasswordIncorrectError;
