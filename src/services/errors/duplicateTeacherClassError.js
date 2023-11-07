class DuplicateTeacherClass extends Error {
  constructor() {
    super(
      "O professor já está marcado em outra turma com o mesmo dia e turno."
    );
    this.statusCode = 400;
  }
}

module.exports = DuplicateTeacherClass;
