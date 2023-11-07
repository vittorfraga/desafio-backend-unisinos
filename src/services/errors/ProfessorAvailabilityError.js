class ProfessorAvailabilityError extends Error {
  constructor(
    message = "O professor não está disponível no turno especificado."
  ) {
    super(message);
    this.name = "ProfessorAvailabilityError";
    this.statusCode = 400;
    this.message = "Número de aulas do professor cadastrado excedido.";
  }
}

module.exports = ProfessorAvailabilityError;
