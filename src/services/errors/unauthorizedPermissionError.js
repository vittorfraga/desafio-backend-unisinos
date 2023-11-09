class UnauthorizedPermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedPermissionError";
    this.statusCode = 403;
    this.message = "Usuário sem permissões suficientes.";
  }
}

module.exports = UnauthorizedPermissionError;
