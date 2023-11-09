const bcrypt = require("bcrypt");
const EmailAlreadyExistsError = require("./errors/emailAlreadyExistsError");
const EmailOrPasswordIncorrectError = require("./errors/emailOrPasswordIncorrectError");
const UserNotFoundError = require("./errors/userNotFoundError");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(name, email, password, userType) {
    const emailExists = await this.userRepository.emailAlreadyExists(email);

    if (emailExists) {
      throw new EmailAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.insertUser(
      name,
      email,
      hashedPassword,
      userType
    );
    console.log(user);
    return user;
  }

  async createUserSession(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new EmailOrPasswordIncorrectError();

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new EmailOrPasswordIncorrectError();

    return user;
  }

  async findById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFoundError();

    return user;
  }
}

module.exports = UserService;
