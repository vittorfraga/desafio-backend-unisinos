const UserRepository = require("../../repository/userRepository");
const UserService = require("../userService");

function makeUserService() {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  return userService;
}

module.exports = makeUserService;
