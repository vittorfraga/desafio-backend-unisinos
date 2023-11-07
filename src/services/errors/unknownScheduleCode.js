class UnknownScheduleCode extends Error {
  constructor(message) {
    super(message);
    this.name = "UnknownScheduleCode";
    this.statusCode = 400;
    this.message = "Código de horário desconhecido.";
  }
}

module.exports = UnknownScheduleCode;
