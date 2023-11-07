const { sign } = require("jsonwebtoken");
const makeUserService = require("../../services/factories/makeUserService");

const createUserController = async (req, res, next) => {
  const { name, email, password, userType } = req.body;

  try {
    const getUserService = makeUserService();

    await getUserService.createUser(name, email, password, userType);

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  } catch (error) {
    next(error);
  }
};

const createUserSessionController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const getUserService = makeUserService();

    const user = await getUserService.createUserSession(email, password);

    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  createUserController,
  createUserSessionController,
};
