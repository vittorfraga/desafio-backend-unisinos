const ClassesRepository = require("../../repository/classesRepository");
const UserRepository = require("../../repository/userRepository");
const ClassesService = require("../classesService");

function makeClassesService() {
  const classesRepository = new ClassesRepository();
  const userRepository = new UserRepository();
  const classesService = new ClassesService(classesRepository, userRepository);
  return classesService;
}

module.exports = makeClassesService;
