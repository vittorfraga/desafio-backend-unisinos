const ProfessorAvailabilityError = require("../../services/errors/ProfessorAvailabilityError");
const DuplicateTeacherClassError = require("../../services/errors/duplicateTeacherClassError");
const EmailAlreadyExistsError = require("../../services/errors/emailAlreadyExistsError");
const EmailOrPasswordIncorrectError = require("../../services/errors/emailOrPasswordIncorrectError");
const UnauthorizedPermissionError = require("../../services/errors/unauthorizedPermissionError");
const UnknownScheduleCode = require("../../services/errors/unknownScheduleCode");
const UserNotFoundError = require("../../services/errors/userNotFoundError");
const UserTypeError = require("../../services/errors/userTypeError");

function errorHandler(err, req, res, next) {
  if (err instanceof EmailAlreadyExistsError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof DuplicateTeacherClassError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof EmailOrPasswordIncorrectError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof UserTypeError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof UserNotFoundError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ProfessorAvailabilityError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof UnknownScheduleCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof UnauthorizedPermissionError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.log(err);

  return res.status(500).json({ error: "Erro interno do servidor." });
}

module.exports = errorHandler;
